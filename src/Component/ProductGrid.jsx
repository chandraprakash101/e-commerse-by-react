import React, { useEffect, useState } from "react"
import ProductCard from "./ProductCard"

const ProductGrid = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [productDataArr, setProductDataArr] = useState([]) 
  const [loading, setLoading] = useState(false)

  async function getData() {
    setLoading(true)
    const apiData = await fetch(`https://dummyjson.com/products?limit=12&skip=${(currentPage - 1) * 12}`)
    const data = await apiData.json()
    setProductDataArr(data.products)
    setLoading(false)
  }

  useEffect(() => {
    getData()
    
  }, [currentPage])

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Featured Products</h2>
        <span className="text-sm text-gray-500">Page {currentPage}</span>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {loading
          ? Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-80 animate-pulse rounded-xl border border-gray-200 bg-gray-100" />
            ))
          : productDataArr.map((productObj) => (
              <ProductCard key={productObj.id} data={productObj} />
            ))}
      </div>

      {/* Pagination Buttons */}
      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-blue-300 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </section>
  )
}

export default ProductGrid