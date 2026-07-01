import React, { useEffect, useState, useContext } from "react"
import ProductCard from "./ProductCard";
import UseGetHomeProductData from "../CustomHooks/UseGetHomeProductData";
import { ThemeContext } from "../Store/ThemeProvider";

const ProductGrid = () => {
  const { theme } = useContext(ThemeContext);
  const [currentPage, setCurrentPage] = useState(1);
  const { productDataArr, loading, error } = UseGetHomeProductData(currentPage);
  const lightTheme = "bg-[#F7F7F7] text-[#181818] border-gray-200";
  const darkTheme = "bg-[#181818] text-[#F7F7F7] border-neutral-800";

  return (
    <section className={` ${theme === 'light' ? lightTheme : darkTheme} w-full px-4 py-8`}>
      <div className="mb-6 flex items-center justify-between">
        <h2
          className="text-xl font-bold"
          style={{
            color: theme === "dark" ? "#f5f5f5" : "#111827",
          }}
        >
          Featured Products
        </h2>
        <span
          className="text-sm"
          style={{
            color: theme === "dark" ? "#a1a1a1" : "#6b7280",
          }}
        >
          Page {currentPage}
        </span>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
          : productDataArr.map((productObj) => (
              <ProductCard key={productObj.id} data={productObj} />
            ))}
      </div>

      {/* Pagination Buttons */}
      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="rounded-lg border px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40"
          style={{
            borderColor: theme === "dark" ? "#3f3f46" : "#e5e7eb",
            backgroundColor: theme === "dark" ? "#27272a" : "#ffffff",
            color: theme === "dark" ? "#d4d4d8" : "#374151",
          }}
          onMouseEnter={(e) => {
            if (currentPage > 1) {
              e.target.style.borderColor = theme === "dark" ? "#3b82f6" : "#93c5fd";
              e.target.style.color = theme === "dark" ? "#60a5fa" : "#2563eb";
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = theme === "dark" ? "#3f3f46" : "#e5e7eb";
            e.target.style.color = theme === "dark" ? "#d4d4d8" : "#374151";
          }}
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          className="rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors"
          style={{
            backgroundColor: theme === "dark" ? "#1d4ed8" : "#2563eb",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = theme === "dark" ? "#1e40af" : "#1d4ed8";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = theme === "dark" ? "#1d4ed8" : "#2563eb";
          }}
        >
          Next
        </button>
      </div>
    </section>
  );
}

export default ProductGrid