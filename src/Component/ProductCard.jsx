import React from 'react';
import { ShoppingBag, Star } from "lucide-react";
import { Link } from 'react-router-dom';

const ProductCard = ({ data }) => {
  
  const { thumbnail, title, brand, description, price, discountPercentage, rating, id } = data;

  
  const oldPrice = (price / (1 - discountPercentage / 100)).toFixed(2);

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl">
      
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Link to={`/product/${id}`}>
        <img
          src={thumbnail || "/placeholder.svg"}
          alt={title}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
        /></Link>
        {discountPercentage > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white">
            -{Math.round(discountPercentage)}%
          </span>
        )}
      </div>

      
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 text-sm font-semibold text-gray-900">{title}</h3>
          {brand && (
            <span className="shrink-0 rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-600">
              {brand}
            </span>
          )}
        </div>

        
        {rating != null && (
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span className="text-xs font-medium text-gray-600">{rating}</span>
          </div>
        )}

        <p className="line-clamp-2 text-xs leading-relaxed text-gray-500">{description}</p>

        
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-lg font-bold text-gray-900">${price}</span>
          <span className="text-xs text-gray-400 line-through">${oldPrice}</span>
        </div>

       
        <button className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-700 active:scale-[0.98]">
          <ShoppingBag className="h-4 w-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;