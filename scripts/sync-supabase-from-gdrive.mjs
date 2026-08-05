import fs from 'fs';
import { google } from 'googleapis';
import { createClient } from '@supabase/supabase-js';

// Parse .env.local natively
if (fs.existsSync('.env.local')) {
  const envConfig = fs.readFileSync('.env.local', 'utf8');
  for (const line of envConfig.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx > 0) {
      const key = trimmed.substring(0, eqIdx).trim();
      let val = trimmed.substring(eqIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = val;
    }
  }
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const GDRIVE_PARENT_FOLDER_ID = process.env.GDRIVE_PARENT_FOLDER_ID || '';

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing Supabase URL or Service Role Key in .env.local');
  process.exit(1);
}

if (!GDRIVE_PARENT_FOLDER_ID) {
  console.error('❌ Missing GDRIVE_PARENT_FOLDER_ID in .env.local');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const jsonKeyPath = 'E:\\Downloads\\stockvault-drive-690dab4a92c9.json';
let auth;
if (fs.existsSync(jsonKeyPath)) {
  auth = new google.auth.GoogleAuth({
    keyFile: jsonKeyPath,
    scopes: ['https://www.googleapis.com/auth/drive.readonly', 'https://www.googleapis.com/auth/drive'],
  });
} else {
  auth = new google.auth.JWT({
    email: process.env.GDRIVE_CLIENT_EMAIL,
    key: process.env.GDRIVE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/drive.readonly', 'https://www.googleapis.com/auth/drive'],
  });
}

const drive = google.drive({ version: 'v3', auth });

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

async function syncSupabaseFromDrive() {
  console.log(`🔍 Scanning Google Drive Folder (ID: ${GDRIVE_PARENT_FOLDER_ID}) for uploaded bundles...`);

  // Query subfolders inside parent folder
  const response = await drive.files.list({
    q: `'${GDRIVE_PARENT_FOLDER_ID}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
    fields: 'files(id, name)',
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
  });

  const folders = response.data.files || [];
  console.log(`📦 Found ${folders.length} uploaded bundle folders in Google Drive.`);

  for (let i = 0; i < folders.length; i++) {
    const driveFolder = folders[i];
    const { title, price, category, productId, slug } = parseFolderDetails(driveFolder.name);

    // Count files inside this subfolder
    const fileCountRes = await drive.files.list({
      q: `'${driveFolder.id}' in parents and trashed = false`,
      fields: 'files(id)',
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
    });
    const fileCount = fileCountRes.data.files?.length || 100;

    console.log(`\n[${i + 1}/${folders.length}] Syncing: "${title}"`);
    console.log(`  Folder ID: ${driveFolder.id}`);
    console.log(`  Price: ₹${price} | Files: ${fileCount} | Category: ${category}`);

    // Insert into Supabase
    const { error: dbError } = await supabase.from('products').upsert({
      product_id: productId,
      title: title,
      slug: slug,
      description: `High quality ${title} bundle with ${fileCount} unwatermarked 4K and 9:16 vertical reels.`,
      price: price,
      original_price: price * 2,
      category: category,
      thumbnail_url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
      preview_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      drive_file_id: driveFolder.id,
      drive_account: 'drive_acc_01',
      folder_name: driveFolder.name,
      total_files: fileCount,
      zip_size: `${(fileCount * 5).toFixed(0)} MB`,
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
      console.error(`  ❌ Supabase Error:`, dbError.message);
    } else {
      console.log(`  🎉 Published to Supabase database!`);
    }
  }

  console.log('\n===================================================');
  console.log('✅ ALL GOOGLE DRIVE FOLDERS SYNCED TO SUPABASE CATALOG!');
  console.log('===================================================');
}

syncSupabaseFromDrive().catch(err => {
  console.error('Fatal Error during sync:', err);
});
