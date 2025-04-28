import React, { useState, useEffect } from 'react';
import { FilterOptions, ProductCategory, ProductCondition } from '../../types';
import { Filter, Search, X } from 'lucide-react';

interface ProductFilterProps {
  onFilter: (options: FilterOptions) => void;
  initialFilters?: FilterOptions;
}

const CATEGORIES: { value: ProductCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All Categories' },
  { value: 'books', label: 'Books' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'furniture', label: 'Furniture' },
  { value: 'hostel', label: 'Hostel Essentials' },
  { value: 'sports', label: 'Sports' },
  { value: 'other', label: 'Other' }
];

const CONDITIONS: { value: ProductCondition | 'all'; label: string }[] = [
  { value: 'all', label: 'Any Condition' },
  { value: 'new', label: 'New' },
  { value: 'like-new', label: 'Like New' },
  { value: 'good', label: 'Good' },
  { value: 'fair', label: 'Fair' },
  { value: 'poor', label: 'Poor' }
];

const ProductFilter: React.FC<ProductFilterProps> = ({ onFilter, initialFilters = {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);
  const [college, setCollege] = useState(initialFilters.college || '');
  const [minPrice, setMinPrice] = useState(initialFilters.minPrice?.toString() || '');
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice?.toString() || '');
  const [search, setSearch] = useState(initialFilters.search || '');

  // Apply initial filters
  useEffect(() => {
    if (Object.keys(initialFilters).length > 0) {
      setFilters(initialFilters);
      setCollege(initialFilters.college || '');
      setMinPrice(initialFilters.minPrice?.toString() || '');
      setMaxPrice(initialFilters.maxPrice?.toString() || '');
      setSearch(initialFilters.search || '');
    }
  }, [initialFilters]);

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };

  const handlePriceChange = () => {
    const newFilters = { ...filters };
    
    if (minPrice) {
      newFilters.minPrice = parseFloat(minPrice);
    } else {
      delete newFilters.minPrice;
    }
    
    if (maxPrice) {
      newFilters.maxPrice = parseFloat(maxPrice);
    } else {
      delete newFilters.maxPrice;
    }
    
    setFilters(newFilters);
  };

  const handleCollegeChange = () => {
    const newFilters = { ...filters };
    
    if (college) {
      newFilters.college = college;
    } else {
      delete newFilters.college;
    }
    
    setFilters(newFilters);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newFilters = { ...filters };
    
    if (search) {
      newFilters.search = search;
    } else {
      delete newFilters.search;
    }
    
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const applyFilters = () => {
    onFilter(filters);
    setIsOpen(false);
  };

  const resetFilters = () => {
    const resetFiltersObj: FilterOptions = {};
    setFilters(resetFiltersObj);
    setCollege('');
    setMinPrice('');
    setMaxPrice('');
    setSearch('');
    onFilter(resetFiltersObj);
    setIsOpen(false);
  };

  const hasActiveFilters = () => {
    return Object.keys(filters).some(key => {
      if (key === 'category') {
        return filters.category !== 'all' && filters.category !== undefined;
      }
      if (key === 'condition') {
        return filters.condition !== 'all' && filters.condition !== undefined;
      }
      return filters[key as keyof FilterOptions] !== undefined;
    });
  };

  const countActiveFilters = () => {
    let count = 0;
    if (filters.category && filters.category !== 'all') count++;
    if (filters.condition && filters.condition !== 'all') count++;
    if (filters.minPrice !== undefined) count++;
    if (filters.maxPrice !== undefined) count++;
    if (filters.college) count++;
    if (filters.onlyFree) count++;
    return count;
  };

  return (
    <div className="mb-6">
      {/* Search Form */}
      <form onSubmit={handleSearchSubmit} className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-3.5 text-gray-400 h-5 w-5" />
          <button 
            type="submit"
            className="absolute right-3 top-2.5 bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 rounded-md transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
            hasActiveFilters() ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Filter className="h-5 w-5" />
          <span>Filter{countActiveFilters() > 0 ? ` (${countActiveFilters()})` : ''}</span>
        </button>

        {/* Category quick selector */}
        <div className="hidden md:flex space-x-2 overflow-x-auto">
          {CATEGORIES.slice(0, 5).map(category => (
            <button
              key={category.value}
              onClick={() => {
                handleFilterChange('category', category.value);
                onFilter({ ...filters, category: category.value });
              }}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors whitespace-nowrap ${
                filters.category === category.value
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
          <button
            onClick={() => setIsOpen(true)}
            className="px-3 py-1.5 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors whitespace-nowrap"
          >
            More...
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 animate-fadeIn">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Filter Products</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={filters.category || 'all'}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              >
                {CATEGORIES.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Condition Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
              <select
                value={filters.condition || 'all'}
                onChange={(e) => handleFilterChange('condition', e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              >
                {CONDITIONS.map(condition => (
                  <option key={condition.value} value={condition.value}>
                    {condition.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  onBlur={handlePriceChange}
                  className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  onBlur={handlePriceChange}
                  className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            {/* College Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">College</label>
              <input
                type="text"
                placeholder="Enter college name"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                onBlur={handleCollegeChange}
                className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            {/* Free Items Toggle */}
            <div className="flex items-center">
              <input
                id="free-items"
                type="checkbox"
                checked={filters.onlyFree || false}
                onChange={(e) => handleFilterChange('onlyFree', e.target.checked)}
                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
              <label htmlFor="free-items" className="ml-2 text-sm font-medium text-gray-700">
                Show only free items
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={resetFilters}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Reset Filters
            </button>
            <button
              onClick={applyFilters}
              className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters() && (
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <span className="text-sm text-gray-600">Active filters:</span>
          
          {filters.category && filters.category !== 'all' && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              Category: {CATEGORIES.find(c => c.value === filters.category)?.label}
              <button
                onClick={() => {
                  const newFilters = { ...filters };
                  delete newFilters.category;
                  setFilters(newFilters);
                  onFilter(newFilters);
                }}
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          
          {filters.condition && filters.condition !== 'all' && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              Condition: {CONDITIONS.find(c => c.value === filters.condition)?.label}
              <button
                onClick={() => {
                  const newFilters = { ...filters };
                  delete newFilters.condition;
                  setFilters(newFilters);
                  onFilter(newFilters);
                }}
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          
          {filters.minPrice !== undefined && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              Min Price: ${filters.minPrice}
              <button
                onClick={() => {
                  const newFilters = { ...filters };
                  delete newFilters.minPrice;
                  setFilters(newFilters);
                  setMinPrice('');
                  onFilter(newFilters);
                }}
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          
          {filters.maxPrice !== undefined && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              Max Price: ${filters.maxPrice}
              <button
                onClick={() => {
                  const newFilters = { ...filters };
                  delete newFilters.maxPrice;
                  setFilters(newFilters);
                  setMaxPrice('');
                  onFilter(newFilters);
                }}
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          
          {filters.college && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              College: {filters.college}
              <button
                onClick={() => {
                  const newFilters = { ...filters };
                  delete newFilters.college;
                  setFilters(newFilters);
                  setCollege('');
                  onFilter(newFilters);
                }}
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          
          {filters.onlyFree && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              Free Items Only
              <button
                onClick={() => {
                  const newFilters = { ...filters };
                  delete newFilters.onlyFree;
                  setFilters(newFilters);
                  onFilter(newFilters);
                }}
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          
          {filters.search && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              Search: "{filters.search}"
              <button
                onClick={() => {
                  const newFilters = { ...filters };
                  delete newFilters.search;
                  setFilters(newFilters);
                  setSearch('');
                  onFilter(newFilters);
                }}
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          
          <button
            onClick={resetFilters}
            className="text-xs text-emerald-600 hover:text-emerald-800 hover:underline"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductFilter;