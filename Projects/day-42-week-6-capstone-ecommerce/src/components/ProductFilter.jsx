import React from 'react'
import styles from './ProductFilter.module.css'

function ProductFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange,
  sortBy,
  onSortChange,
  searchTerm,
  onSearchChange
}) {
  return (
    <div className={styles.filterBar}>
      <div className={styles.searchBox}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="🔍 Search products..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className={styles.filterControls}>
        <select 
          className={styles.select}
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        
        <select 
          className={styles.select}
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="default">Sort by: Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Rating: High to Low</option>
          <option value="title-asc">Name: A to Z</option>
        </select>
      </div>
    </div>
  )
}

export default ProductFilter