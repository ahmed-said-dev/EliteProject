'use client';

import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Folder, FolderOpen } from 'lucide-react';
import { CategoryFilter as CategoryFilterType, LanguageCode } from '@/utils/vendure/types';

interface CategoryFilterProps {
  categories: CategoryFilterType[];
  selectedCategories: string[];
  onSelectionChange: (categories: string[]) => void;
  language: LanguageCode;
  maxHeight?: string;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategories,
  onSelectionChange,
  language,
  maxHeight = 'max-h-64',
}) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const toggleCategoryExpansion = (categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const handleCategoryToggle = (categoryId: string) => {
    const isSelected = selectedCategories.includes(categoryId);
    let newSelection: string[];

    if (isSelected) {
      newSelection = selectedCategories.filter(id => id !== categoryId);
    } else {
      newSelection = [...selectedCategories, categoryId];
    }

    onSelectionChange(newSelection);
  };

  const getCategoryName = (category: CategoryFilterType): string => {
    return language === 'ar' ? category.nameAr || category.name : category.name;
  };

  const renderCategory = (category: CategoryFilterType, level: number = 0) => {
    const isSelected = selectedCategories.includes(category.id);
    const isExpanded = expandedCategories.has(category.id);
    const hasChildren = category.children && category.children.length > 0;
    const indent = level * 20;

    return (
      <div key={category.id} className="select-none">
        <div 
          className={`flex items-center gap-2 py-2 px-2 rounded-md hover:bg-gray-50 transition-colors cursor-pointer ${
            isSelected ? 'bg-blue-50 border border-blue-200' : ''
          }`}
          style={{ paddingLeft: `${8 + indent}px` }}
        >
          {/* Expansion toggle for categories with children */}
          {hasChildren && (
            <button
              onClick={() => toggleCategoryExpansion(category.id)}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
            >
              {isExpanded ? (
                <ChevronDown className="w-3 h-3 text-gray-500" />
              ) : (
                <ChevronRight className="w-3 h-3 text-gray-500" />
              )}
            </button>
          )}

          {/* Spacer for categories without children */}
          {!hasChildren && <div className="w-5" />}

          {/* Category icon */}
          {hasChildren ? (
            isExpanded ? (
              <FolderOpen className="w-4 h-4 text-blue-500 flex-shrink-0" />
            ) : (
              <Folder className="w-4 h-4 text-gray-500 flex-shrink-0" />
            )
          ) : (
            <div className="w-4 h-4 bg-gray-300 rounded-sm flex-shrink-0" />
          )}

          {/* Checkbox */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <input
              type="checkbox"
              id={`category-${category.id}`}
              checked={isSelected}
              onChange={() => handleCategoryToggle(category.id)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            
            {/* Category name and count */}
            <label
              htmlFor={`category-${category.id}`}
              className="flex items-center justify-between flex-1 min-w-0 cursor-pointer"
            >
              <span className={`text-sm truncate ${
                isSelected ? 'font-medium text-blue-700' : 'text-gray-700'
              }`}>
                {getCategoryName(category)}
              </span>
              
              {category.count > 0 && (
                <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ml-2 ${
                  isSelected 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {category.count}
                </span>
              )}
            </label>
          </div>
        </div>

        {/* Children categories */}
        {hasChildren && isExpanded && (
          <div className="mt-1">
            {category.children!.map(child => renderCategory(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  if (categories.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500 text-sm">
        {language === 'ar' 
          ? 'لا توجد فئات متاحة' 
          : 'No categories available'
        }
      </div>
    );
  }

  return (
    <div className={`${maxHeight} overflow-y-auto space-y-1`}>
      {categories.map(category => renderCategory(category))}
      
      {/* Selected categories summary */}
      {selectedCategories.length > 0 && (
        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="text-xs text-gray-500 mb-2">
            {language === 'ar' 
              ? `تم اختيار ${selectedCategories.length} فئة` 
              : `${selectedCategories.length} categories selected`
            }
          </div>
          <div className="flex flex-wrap gap-1">
            {selectedCategories.map(categoryId => {
              const category = findCategoryById(categories, categoryId);
              if (!category) return null;
              
              return (
                <span
                  key={categoryId}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                >
                  {getCategoryName(category)}
                  <button
                    onClick={() => handleCategoryToggle(categoryId)}
                    className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                  >
                    <ChevronRight className="w-3 h-3 rotate-45" />
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to find a category by ID in the tree
function findCategoryById(categories: CategoryFilterType[], id: string): CategoryFilterType | null {
  for (const category of categories) {
    if (category.id === id) {
      return category;
    }
    if (category.children) {
      const found = findCategoryById(category.children, id);
      if (found) return found;
    }
  }
  return null;
}

export default CategoryFilter;