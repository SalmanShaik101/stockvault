'use client';

import React from 'react';
import { Category } from '@/types';
import { Sparkles, Dumbbell, Zap, Car, Crown, Cpu, Smile, Laugh } from 'lucide-react';

interface CategoryFilterBarProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Sparkles,
  Dumbbell,
  Zap,
  Car,
  Crown,
  Cpu,
  Smile,
  Laugh,
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
          const IconComponent = ICON_MAP[cat.iconName] || Sparkles;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 border ${
                isSelected
                  ? 'bg-indigo-600/90 text-white border-indigo-400 shadow-lg shadow-indigo-500/25'
                  : 'bg-white/[0.03] text-zinc-400 border-white/10 hover:border-white/20 hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              <IconComponent className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-indigo-400'}`} />
              <span>{cat.name}</span>
              <span
                className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                  isSelected ? 'bg-indigo-900/60 text-white' : 'bg-zinc-800 text-zinc-400'
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
