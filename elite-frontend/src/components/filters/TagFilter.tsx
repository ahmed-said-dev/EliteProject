'use client';

import React, { useState, useMemo } from 'react';
import { Search, Tag, X, Hash } from 'lucide-react';
import { FilterOption, LanguageCode } from '@/utils/vendure/types';
import { useLanguage } from '@/context/LanguageContext';

interface TagFilterProps {
  tags: FilterOption[];
  selectedTags: string[];
  onSelectionChange: (tags: string[]) => void;
  language: LanguageCode;
  maxHeight?: string;
  showSearch?: boolean;
  displayStyle?: 'list' | 'chips';
}

const TagFilter: React.FC<TagFilterProps> = ({
  tags,
  selectedTags,
  onSelectionChange,
  language,
  maxHeight = 'max-h-48',
  showSearch = true,
  displayStyle = 'list',
}) => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlySelected, setShowOnlySelected] = useState(false);

  const getTagName = (tag: FilterOption): string => {
    return language === 'ar' ? tag.nameAr || tag.name : tag.name;
  };

  // Filter and sort tags
  const filteredTags = useMemo(() => {
    let filtered = tags;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(tag => {
        const name = getTagName(tag);
        return name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               tag.code.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }

    // Show only selected tags if toggle is on
    if (showOnlySelected) {
      filtered = filtered.filter(tag => selectedTags.includes(tag.id));
    }

    // Sort by count (descending) then by name
    return filtered.sort((a, b) => {
      const aSelected = selectedTags.includes(a.id);
      const bSelected = selectedTags.includes(b.id);
      
      if (aSelected && !bSelected) return -1;
      if (!aSelected && bSelected) return 1;
      
      // Sort by count first, then name
      if (b.count !== a.count) return b.count - a.count;
      
      const aName = getTagName(a);
      const bName = getTagName(b);
      return aName.localeCompare(bName);
    });
  }, [tags, searchTerm, selectedTags, showOnlySelected, language]);

  const handleTagToggle = (tagId: string) => {
    const isSelected = selectedTags.includes(tagId);
    let newSelection: string[];

    if (isSelected) {
      newSelection = selectedTags.filter(id => id !== tagId);
    } else {
      newSelection = [...selectedTags, tagId];
    }

    onSelectionChange(newSelection);
  };

  const clearSelection = () => {
    onSelectionChange([]);
  };

  const selectPopular = () => {
    const popularTags = filteredTags
      .filter(tag => tag.count >= 10)
      .slice(0, 5)
      .map(tag => tag.id);
    onSelectionChange([...new Set([...selectedTags, ...popularTags])]);
  };

  // Color scheme for tag chips
  const getTagColor = (index: number) => {
    const colors = [
      'bg-blue-100 text-blue-800 border-blue-200',
      'bg-green-100 text-green-800 border-green-200',
      'bg-purple-100 text-purple-800 border-purple-200',
      'bg-pink-100 text-pink-800 border-pink-200',
      'bg-indigo-100 text-indigo-800 border-indigo-200',
      'bg-yellow-100 text-yellow-800 border-yellow-200',
    ];
    return colors[index % colors.length];
  };

  if (tags.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500 text-sm">
        {language === 'ar' 
          ? 'لا توجد تصنيفات متاحة' 
          : 'No tags available'
        }
      </div>
    );
  }

  // Chips display style
  if (displayStyle === 'chips') {
    return (
      <div className="space-y-3">
        {showSearch && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={
                language === 'ar' 
                  ? 'ابحث عن تصنيف...' 
                  : 'Search tags...'
              }
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )}

        <div className={`${maxHeight} overflow-y-auto`}>
          <div className="flex flex-wrap gap-2">
            {filteredTags.map((tag, index) => {
              const isSelected = selectedTags.includes(tag.id);
              const tagName = getTagName(tag);

              return (
                <button
                  key={tag.id}
                  onClick={() => handleTagToggle(tag.id)}
                  className={`inline-flex items-center gap-1 px-3 py-1 text-sm rounded-full border transition-all hover:shadow-sm ${
                    isSelected
                      ? 'bg-blue-500 text-white border-blue-500 shadow-sm'
                      : `${getTagColor(index)} hover:shadow-md`
                  }`}
                >
                  <Hash className="w-3 h-3" />
                  <span>{tagName}</span>
                  {tag.count > 0 && (
                    <span className={`text-xs px-1 py-0.5 rounded-full ${
                      isSelected ? 'bg-blue-400' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {tag.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {selectedTags.length > 0 && (
          <div className="flex items-center justify-between pt-2 border-t border-gray-200">
            <span className="text-xs text-gray-500">
              {t('filters.tags.selected').replace('%count%', selectedTags.length.toString())}
            </span>
            <button
              onClick={clearSelection}
              className="text-xs text-red-600 hover:text-red-700 transition-colors"
            >
              {t('filters.tags.clear')}
            </button>
          </div>
        )}
      </div>
    );
  }

  // List display style
  return (
    <div className="space-y-3">
      {/* Search and controls */}
      {showSearch && (
        <div className="space-y-2">
          {/* Search input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={
                language === 'ar' 
                  ? 'ابحث عن تصنيف...' 
                  : 'Search tags...'
              }
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter controls */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowOnlySelected(!showOnlySelected)}
                className={`px-2 py-1 rounded transition-colors ${
                  showOnlySelected 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {language === 'ar' ? 'المحددة فقط' : 'Selected only'}
              </button>
              <span className="text-gray-500">
                              {t('filters.tags.showing').replace('%filtered%', filteredTags.length.toString()).replace('%total%', tags.length.toString())}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {selectedTags.length > 0 && (
                <button
                  onClick={clearSelection}
                  className="text-red-600 hover:text-red-700 transition-colors"
                >
                  {language === 'ar' ? 'مسح الكل' : 'Clear'}
                </button>
              )}
              
              {filteredTags.some(tag => tag.count >= 10) && (
                <button
                  onClick={selectPopular}
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                >
                  {language === 'ar' ? 'الشائع' : 'Popular'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tags list */}
      <div className={`${maxHeight} overflow-y-auto space-y-1`}>
        {filteredTags.length === 0 ? (
          <div className="text-center py-4 text-gray-500 text-sm">
            {language === 'ar' 
              ? 'لا توجد تصنيفات مطابقة' 
              : 'No matching tags found'
            }
          </div>
        ) : (
          filteredTags.map((tag, index) => {
            const isSelected = selectedTags.includes(tag.id);
            const tagName = getTagName(tag);

            return (
              <div
                key={tag.id}
                className={`flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 transition-colors cursor-pointer ${
                  isSelected ? 'bg-blue-50 border border-blue-200' : ''
                }`}
                onClick={() => handleTagToggle(tag.id)}
              >
                {/* Checkbox */}
                <input
                  type="checkbox"
                  id={`tag-${tag.id}`}
                  checked={isSelected}
                  onChange={() => handleTagToggle(tag.id)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />

                {/* Tag info */}
                <div className="flex items-center justify-between flex-1 min-w-0">
                  <label
                    htmlFor={`tag-${tag.id}`}
                    className="flex items-center gap-2 flex-1 min-w-0 cursor-pointer"
                  >
                    {/* Tag icon */}
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      isSelected 
                        ? 'bg-blue-500 text-white' 
                        : getTagColor(index)
                    }`}>
                      <Hash className="w-3 h-3" />
                    </div>

                    {/* Tag name */}
                    <span className={`text-sm truncate ${
                      isSelected ? 'font-medium text-blue-700' : 'text-gray-700'
                    }`}>
                      {tagName}
                    </span>

                    {/* Popular indicator */}
                    {tag.count >= 20 && (
                      <span className="text-xs bg-orange-100 text-orange-600 px-1 py-0.5 rounded">
                        {language === 'ar' ? 'شائع' : 'Popular'}
                      </span>
                    )}
                  </label>

                  {/* Product count */}
                  {tag.count > 0 && (
                    <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                      isSelected 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {tag.count}
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Selected tags summary */}
      {selectedTags.length > 0 && !showOnlySelected && (
        <div className="pt-3 border-t border-gray-200">
          <div className="text-xs text-gray-500 mb-2">
                          {t('filters.tags.selected').replace('%count%', selectedTags.length.toString())}
          </div>
          <div className="flex flex-wrap gap-1">
            {selectedTags.slice(0, 6).map(tagId => {
              const tag = tags.find(t => t.id === tagId);
              if (!tag) return null;
              
              return (
                <span
                  key={tagId}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                >
                  <Hash className="w-3 h-3" />
                  {getTagName(tag)}
                  <button
                    onClick={() => handleTagToggle(tagId)}
                    className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              );
            })}
            {selectedTags.length > 6 && (
              <span className="text-xs text-gray-500 px-2 py-1">
                +{selectedTags.length - 6} {language === 'ar' ? 'أخرى' : 'more'}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TagFilter;