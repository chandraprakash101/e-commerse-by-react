import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../Component/Navbar';
import { useParams } from 'react-router-dom';
import UseGetProductByCategory from '../CustomHooks/UseGetProductByCategory';
import ProductCard from '../Component/ProductCard';
import { ThemeContext } from '../Store/ThemeProvider';

const ProductCategory = () => {
  const {theme, setTheme} = useContext(ThemeContext)
  const {categoryData, loading} = UseGetProductByCategory();

 
  return (
    <div>
     <Navbar />
     <div className='mt-18 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'> 
      {loading
          ? Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="h-80 animate-pulse rounded-xl border"
                style={{
                  borderColor: theme === "dark" ? "#3f3f46" : "#e5e7eb",
                  backgroundColor: theme === "dark" ? "#3f3f46" : "#f3f4f6",
                }}
              />
            ))
          : categoryData.map((productObj) => (
              <ProductCard key={productObj.id} data={productObj} />
            ))}
     </div>
    </div>
  )
}

export default ProductCategory
