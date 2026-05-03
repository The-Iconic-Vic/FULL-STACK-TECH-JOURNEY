import React, { useState, useMemo } from 'react'
import useFetch from '../hooks/useFetch'
import ProductCard from '../components/ProductCard'
import ProductFilter from '../components/ProductFilter'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import styles from './ProductsPage.module.css'

const API_URL = 'https://fakestoreapi.com/products'

function ProductsPage() {
  const { data: products, loading, error, refetch } = useFetch(API_URL)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('default')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = useMemo(() => {
    if (!products) return []
    const cats = [...new Set(products.map(p => p.category))]
    return cats
  }, [products])

  const filteredProducts = useMemo(() => {
    if (!products) return []
    
    let filtered = [...products]
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
      )
    }
    
    switch(sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating-desc':
        filtered.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
        break
      case 'title-asc':
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      default:
        break
    }
    
    return filtered
  }, [products, selectedCategory, sortBy, searchTerm])

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} onRetry={refetch} />

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Our Products</h1>
      <ProductFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      
      <div className={styles.stats}>
        Showing {filteredProducts.length} products
      </div>
      
      {filteredProducts.length === 0 ? (
        <div className={styles.empty}>
          <p>No products found matching your criteria.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductsPage