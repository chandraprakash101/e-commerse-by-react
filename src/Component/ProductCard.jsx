import React from 'react';
import { ShoppingBag, Star } from "lucide-react";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../Store/ThemeProvider';

const ProductCard = ({ data }) => {
  
 const { theme } = useContext(ThemeContext);
  const { thumbnail, title, brand, description, price, discountPercentage, rating, id } = data;
  const oldPrice = (price / (1 - discountPercentage / 100)).toFixed(2);

  return (
    <div
      className="group flex flex-col overflow-hidden rounded-xl border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{
        borderColor: theme === "dark" ? "#3f3f46" : "#e5e7eb",
        backgroundColor: theme === "dark" ? "#27272a" : "#ffffff",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = theme === "dark" ? "#3b82f6" : "#93c5fd";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = theme === "dark" ? "#3f3f46" : "#e5e7eb";
      }}
    >
      <div
        className="relative aspect-square overflow-hidden"
        style={{
          backgroundColor: theme === "dark" ? "#3f3f46" : "#f9fafb",
        }}
      >
        <Link to={`/product/${id}`}>
          <img
            src={thumbnail || "/placeholder.svg"}
            alt={title}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        {discountPercentage > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white">
            -{Math.round(discountPercentage)}%
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3
            className="line-clamp-1 text-sm font-semibold"
            style={{
              color: theme === "dark" ? "#f5f5f5" : "#111827",
            }}
          >
            {title}
          </h3>
          {brand && (
            <span
              className="shrink-0 rounded-md px-2 py-0.5 text-[11px] font-medium"
              style={{
                backgroundColor: theme === "dark" ? "#1e3a8a" : "#eff6ff",
                color: theme === "dark" ? "#93c5fd" : "#2563eb",
              }}
            >
              {brand}
            </span>
          )}
        </div>

        {rating != null && (
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span
              className="text-xs font-medium"
              style={{
                color: theme === "dark" ? "#d4d4d8" : "#4b5563",
              }}
            >
              {rating}
            </span>
          </div>
        )}

        <p
          className="line-clamp-2 text-xs leading-relaxed"
          style={{
            color: theme === "dark" ? "#a1a1a1" : "#6b7280",
          }}
        >
          {description}
        </p>

        <div className="mt-1 flex items-baseline gap-2">
          <span
            className="text-lg font-bold"
            style={{
              color: theme === "dark" ? "#f5f5f5" : "#111827",
            }}
          >
            ${price}
          </span>
          <span
            className="text-xs line-through"
            style={{
              color: theme === "dark" ? "#71717a" : "#9ca3af",
            }}
          >
            ${oldPrice}
          </span>
        </div>

        <button
          className="mt-2 flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 active:scale-[0.98]"
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
          <ShoppingBag className="h-4 w-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;