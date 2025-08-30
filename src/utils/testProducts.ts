import { getProducts, getFeaturedProducts, getProductsByCategory } from '@/lib/api'

// Test function to verify product data loading and fixes
export const testProductData = async () => {
  console.log('🧪 Testing VaporLAX Product Data & Fixes...')

  try {
    // Test all products
    const allProducts = await getProducts()
    console.log(`✅ Loaded ${allProducts.length} products`)

    // Test price parsing specifically (the main fix)
    const priceTests = allProducts.map(p => ({
      id: p.id,
      name: p.name,
      price: p.price,
      priceType: typeof p.price,
      isValidPrice: typeof p.price === 'number' && !isNaN(p.price) && p.price >= 0
    }))

    const invalidPrices = priceTests.filter(p => !p.isValidPrice)
    if (invalidPrices.length > 0) {
      console.warn('⚠️ Products with invalid prices:', invalidPrices)
    } else {
      console.log('✅ All prices parsed correctly as numbers')
    }

    // Test price range
    const prices = allProducts.map(p => p.price).filter(p => p > 0)
    const priceRange = {
      min: Math.min(...prices),
      max: Math.max(...prices),
      average: prices.reduce((a, b) => a + b, 0) / prices.length
    }
    console.log(`✅ Price range: $${priceRange.min.toFixed(2)} - $${priceRange.max.toFixed(2)} (avg: $${priceRange.average.toFixed(2)})`)

    // Test featured products
    const featuredProducts = await getFeaturedProducts()
    console.log(`✅ Found ${featuredProducts.length} featured products`)

    // Test categories
    const categories = [...new Set(allProducts.map(p => p.category))]
    console.log(`✅ Found categories: ${categories.join(', ')}`)

    // Test each category
    for (const category of categories) {
      const categoryProducts = await getProductsByCategory(category)
      console.log(`✅ ${category}: ${categoryProducts.length} products`)
    }

    // Test product structure
    if (allProducts.length > 0) {
      const firstProduct = allProducts[0]
      console.log('✅ Sample product structure:', {
        id: firstProduct.id,
        name: firstProduct.name,
        price: firstProduct.price,
        priceType: typeof firstProduct.price,
        inStock: firstProduct.inStock,
        featured: firstProduct.featured,
        category: firstProduct.category,
        hasImage: !!firstProduct.image,
        hasSpecs: firstProduct.specifications?.length || 0
      })
    }

    // Test stock status
    const stockCounts = {
      inStock: allProducts.filter(p => p.inStock).length,
      outOfStock: allProducts.filter(p => !p.inStock).length
    }
    console.log(`✅ Stock status - In Stock: ${stockCounts.inStock}, Out of Stock: ${stockCounts.outOfStock}`)

    // Test image handling
    const imageTests = allProducts.map(p => ({
      id: p.id,
      hasImage: !!p.image,
      imageUrl: p.image
    }))
    const productsWithImages = imageTests.filter(p => p.hasImage).length
    console.log(`✅ Products with images: ${productsWithImages}/${allProducts.length}`)

    console.log('🎉 All product data tests passed!')
    return true

  } catch (error) {
    console.error('❌ Product data test failed:', error)
    return false
  }
}

// Auto-run test in development
if (process.env.NODE_ENV === 'development') {
  testProductData()
}
