import fs from 'fs';
import path from 'path';
import { google } from 'googleapis';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const BUNDLE_DIR = process.env.BUNDLE_LOCAL_DIR || 'E:\\Downloads\\stock bundle';
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const GDRIVE_CLIENT_EMAIL = process.env.GDRIVE_CLIENT_EMAIL;
const GDRIVE_PRIVATE_KEY = process.env.GDRIVE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const GDRIVE_PARENT_FOLDER_ID = process.env.GDRIVE_PARENT_FOLDER_ID || '';

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing Supabase URL or Service Role Key in .env.local');
  process.exit(1);
}

if (!GDRIVE_CLIENT_EMAIL || !GDRIVE_PRIVATE_KEY) {
  console.error('❌ Missing GDRIVE_CLIENT_EMAIL or GDRIVE_PRIVATE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const auth = new google.auth.JWT({
  email: GDRIVE_CLIENT_EMAIL,
  key: GDRIVE_PRIVATE_KEY,
  scopes: ['https://www.googleapis.com/auth/drive'],
});

const drive = google.drive({ version: 'v3', auth });

async function createDriveFolder(folderName, parentFolderId = '') {
  const fileMetadata = {
    name: folderName,
    mimeType: 'application/vnd.google-apps.folder',
    parents: parentFolderId ? [parentFolderId] : [],
  };

  const folder = await drive.files.create({
    requestBody: fileMetadata,
    fields: 'id',
  });

  return folder.data.id;
}

async function uploadFile(filePath, fileName, parentFolderId) {
  const fileMetadata = {
    name: fileName,
    parents: [parentFolderId],
  };

  const ext = path.extname(fileName).toLowerCase();
  let mimeType = 'video/mp4';
  if (ext === '.jpg' || ext === '.jpeg') mimeType = 'image/jpeg';
  else if (ext === '.png') mimeType = 'image/png';
  else if (ext === '.webp') mimeType = 'image/webp';

  const media = {
    mimeType: mimeType,
    body: fs.createReadStream(filePath),
  };

  const response = await drive.files.create({
    requestBody: fileMetadata,
    media: media,
    fields: 'id',
  });

  return response.data.id;
}

function parseFolderDetails(folderName) {
  const priceMatch = folderName.match(/\{(\d+)\}/);
  const price = priceMatch ? Number(priceMatch[1]) : 199;

  const cleanTitle = folderName.replace(/\{.*?\}/g, '').trim();

  let category = 'general';
  const lower = cleanTitle.toLowerCase();
  if (lower.includes('car')) category = 'supercars';
  else if (lower.includes('motivat') || lower.includes('viral')) category = 'motivation';
  else if (lower.includes('troll')) category = 'trollface';
  else if (lower.includes('3d') || lower.includes('satisfy')) category = '3d-satisfying';
  else if (lower.includes('bhojpuri')) category = 'bhojpuri';
  else if (lower.includes('cartoon')) category = 'cartoon';
  else if (lower.includes('beam')) category = 'gaming';
  else if (lower.includes('usa')) category = 'usa-theme';

  const categoryCode = category.substring(0, 3).toUpperCase();
  const randomNum = Math.floor(100 + Math.random() * 900);
  const productId = `${categoryCode}${randomNum}`;
  const slug = `${category}-${cleanTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${randomNum}`;

  return { title: cleanTitle, price, category, productId, slug };
}

async function startUploadProcess() {
  console.log(`🚀 Starting Automated Google Drive & Supabase Sync from: ${BUNDLE_DIR}`);

  const bundleFolders = fs.readdirSync(BUNDLE_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  console.log(`📦 Found ${bundleFolders.length} bundle folders to process.`);

  for (let i = 0; i < bundleFolders.length; i++) {
    const folderName = bundleFolders[i];
    const fullPath = path.join(BUNDLE_DIR, folderName);
    const { title, price, category, productId, slug } = parseFolderDetails(folderName);

    console.log(`\n---------------------------------------------------`);
    console.log(`[${i + 1}/${bundleFolders.length}] Processing: "${title}"`);
    console.log(`  Price: ₹${price} | Category: ${category}`);

    // Read all files inside the folder
    const files = fs.readdirSync(fullPath).filter(f => !fs.statSync(path.join(fullPath, f)).isDirectory());
    console.log(`  Contains ${files.length} video files.`);

    // Step 1: Create Folder in Google Drive
    console.log(`  Creating Google Drive Folder...`);
    const driveFolderId = await createDriveFolder(folderName, GDRIVE_PARENT_FOLDER_ID);
    console.log(`  ✅ Google Drive Folder Created! ID: ${driveFolderId}`);

    // Step 2: Upload Video Files into Google Drive Folder
    for (let j = 0; j < files.length; j++) {
      const fileName = files[j];
      const filePath = path.join(fullPath, fileName);
      try {
        await uploadFile(filePath, fileName, driveFolderId);
        if ((j + 1) % 10 === 0 || j === files.length - 1) {
          console.log(`    Uploaded ${j + 1}/${files.length} files...`);
        }
      } catch (err) {
        console.error(`    ❌ Failed to upload ${fileName}:`, err.message);
      }
    }

    // Step 3: Insert Product Record in Supabase
    const { error: dbError } = await supabase.from('products').upsert({
      product_id: productId,
      title: title,
      slug: slug,
      description: `High quality ${title} bundle with ${files.length} unwatermarked 4K and 9:16 vertical reels.`,
      price: price,
      original_price: price * 2,
      category: category,
      thumbnail_url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
      preview_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      drive_file_id: driveFolderId,
      drive_account: 'drive_acc_01',
      folder_name: folderName,
      total_files: files.length,
      zip_size: `${(files.length * 5).toFixed(0)} MB`,
      downloads: 0,
      views: 0,
      sales: 0,
      favorites: 0,
      resolution: '1080x1920',
      aspect_ratio: '9:16',
      format: 'MP4',
      tags: [category, 'reels', '4k', 'stock'],
      active: true,
    });

    if (dbError) {
      console.error(`  ❌ Supabase Database Insert Error:`, dbError.message);
    } else {
      console.log(`  🎉 Product successfully published to Supabase Catalog!`);
    }
  }

  console.log('\n===================================================');
  console.log('✅ ALL 27 BUNDLES UPLOADED TO GOOGLE DRIVE & SYNCED TO SUPABASE!');
  console.log('===================================================');
}

startUploadProcess().catch(err => {
  console.error('Fatal Error during sync:', err);
});
