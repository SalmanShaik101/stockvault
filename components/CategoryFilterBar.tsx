'use client';

import React from 'react';
import { Category } from '@/types';
import { LayoutGrid, Activity, Flame, Gauge, Gem, Bot, Sparkles, Smile } from 'lucide-react';

interface CategoryFilterBarProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Sparkles: LayoutGrid,
  Dumbbell: Activity,
  Zap: Flame,
  Car: Gauge,
  Crown: Gem,
  Cpu: Bot,
  Smile: Sparkles,
  Laugh: Smile,
};

export const CategoryFilterBar: React.FC<CategoryFilterBarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="w-full overflow-x-auto pb-4 pt-2 no-scrollbar">
      <div className="flex items-center gap-2.5 min-w-max">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.slug;
          const IconComponent = ICON_MAP[cat.iconName] || LayoutGrid;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 border ${
                isSelected
                  ? 'bg-white text-black border-white shadow-lg shadow-white/10'
                  : 'bg-white/[0.03] text-zinc-400 border-white/10 hover:border-white/25 hover:text-white hover:bg-white/[0.07]'
              }`}
            >
              <IconComponent className={`w-3.5 h-3.5 ${isSelected ? 'text-black' : 'text-white'}`} strokeWidth={1.25} />
              <span>{cat.name}</span>
              <span
                className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                  isSelected ? 'bg-zinc-200 text-black font-extrabold' : 'bg-zinc-900 text-zinc-400'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
