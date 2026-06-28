
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import PdpScaleton from '../Scaleton/PdpScaleton';
import { Star, Truck, ShieldCheck, RotateCcw, PackageCheck } from 'lucide-react';
import UseGetProductById from '../CustomHooks/UseGetProductById';

const Pdp = () => {
  const { id } = useParams();

  const {productData, loading} = UseGetProductById(id);
  const [activeImgInd, setActiveImageInd] = useState(0);
   const [isImgLoading, setIsImgLoading] = useState(true);

  const discountedPrice = productData?.price;
  const originalPrice = productData?.discountPercentage ? productData?.price / (1 - productData?.discountPercentage / 100) : productData?.price;
  const imageArrLength = productData?.images?.length || 0;

  const infoItems = [
    { icon: PackageCheck, label: "Availability", value: productData?.availabilityStatus },
    { icon: Truck, label: "Shipping", value: productData?.shippingInformation }, // Fixed: Corrected value mapping
    { icon: ShieldCheck, label: "Warranty", value: productData?.warrantyInformation },   // Fixed: Corrected value mapping
    { icon: RotateCcw, label: "Returns", value: productData?.returnPolicy }         // Fixed: Corrected value mapping
  ];

  function handleLeft() {
    setIsImgLoading(true); // Image change hote hi loading phir se true
    setActiveImageInd((activeImgInd - 1 + imageArrLength) % imageArrLength);
  }
  function handleRight() {
    setIsImgLoading(true); // Image change hote hi loading phir se true
    setActiveImageInd((activeImgInd + 1) % imageArrLength);
  }

  

  useEffect(() => {
    setActiveImageInd(0); // Naya product aate hi pehli image set karein
  setIsImgLoading(true); // Nayi image ke liye placeholder active karein
  }, [id]);

  if (loading || !productData) {
    return <PdpScaleton />;
  }

  return (
    <div className='w-full bg-gray-50 rounded-2xl mt-12 p-5 overflow-y-auto'>
      <Link to="/">
        <div className='flex py-4 gap-2 text-blue-500 font-bold'><ChevronLeft /><p> Back to products</p></div>
      </Link>
      
      <div className='bg-white md:flex gap-1 rounded-2xl w-full '>
        {/* first container */}
        <div className='md:w-[50%] md:flex gap-3 md:py-2.5 md:pl-2.5 md:justify-items-start bg-white'>
          
          {/* Main Showcase Image Box */}
          <div className='bg-gray-100 md:h-120 border border-gray-300 rounded-2xl relative aspect-square flex items-center justify-center overflow-hidden w-full'>
            
            {/* FIXED LOGIC: Jab tak real image backend/network se download ho rahi hai, tab tak ye inner skeleton placeholder dikhega */}
            {isImgLoading && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-2xl z-0" />
            )}

            <ChevronLeft onClick={handleLeft} className='absolute bg-white text-gray-700 left-2 top-[50%] -translate-y-1/2 rounded-full shadow-md p-1 h-8 w-8 cursor-pointer z-10' />
            
            <img 
              className={`m-2 h-full p-5 object-contain transition-opacity duration-300 ${isImgLoading ? 'opacity-0' : 'opacity-100'}`} 
              src={productData?.images[activeImgInd]} 
              alt={productData?.title}
              // ONLOAD MAGIC: Browser jaise hi photo download complete karega, ye event fire hoga aur loading false ho jayegi
              onLoad={() => setIsImgLoading(false)} 
            />
            
            <ChevronRight onClick={handleRight} className='absolute bg-white text-gray-700 right-2 top-[50%] -translate-y-1/2 rounded-full shadow-md p-1 h-8 w-8 cursor-pointer z-10' />
          </div>

          {/* Thumbnails */}
          <div className='w-full md:w-18 flex md:mr-2 gap-2 p-1 md:flex-col overflow-x-auto md:overflow-y-auto scrollbar-none shrink-0'>
            {productData?.images.map((img, index) => {
              return (
                <div 
                  key={index}
                  onClick={() => {
                    if(activeImgInd !== index) {
                      setIsImgLoading(true); // Thumbnail click par bhi placeholder active karein
                      setActiveImageInd(index);
                    }
                  }}
                  className={`h-15 w-15 shrink-0 cursor-pointer overflow-hidden rounded-lg p-1 border-2 transition-all ${
                    activeImgInd === index ? "border-blue-400 ring-2 ring-blue-50" : "border-gray-200"
                  }`}
                >
                  <img src={img} alt="" className='h-full w-full object-contain mix-blend-multiply' />
                </div>
              )
            })}
          </div>
        </div>

        {/* Second container */}
        <div className='bg-white md:mx-2.5 py-2.5 md:w-[50%] p-4'>
          <div className='flex gap-5 text-xs py-2'>
            <span className='bg-gray-100 font-bold rounded-xl p-1.5 text-gray-600'>{productData?.category}</span>
            <span className='bg-blue-50 text-blue-600 font-bold rounded-xl p-1.5'>{productData?.brand}</span>
          </div>
          
          <h2 className='font-bold text-xl text-gray-800 py-2'>{productData?.title}</h2>
          
          <div className='flex gap-4 py-2 items-center'>
            <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-amber-600 border border-amber-200">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm font-bold">{productData?.rating}</span>
            </div>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              productData?.stock > 0 ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
            }`}>In stock: {productData?.stock}</span>
          </div>

          <div className='bg-gray-50 border border-gray-100 px-3 py-2 rounded-xl flex gap-3 items-baseline '>
            <span className="text-3xl font-black text-gray-900">${discountedPrice?.toFixed(2)}</span>
            <span className='line-through text-gray-400 text-sm'>${originalPrice?.toFixed(2)}</span>
          </div>

          <div className='py-2 font-medium text-gray-600 text-sm leading-relaxed'>
            <p>{productData?.description}</p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {infoItems.map((item) => (
              <div key={item.label} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-3 hover:border-blue-400 transition-colors">
                <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                <div>
                  <p className="text-xs font-medium text-gray-400">{item.label}</p>
                  <p className="text-sm font-semibold text-gray-800">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className='flex flex-col sm:flex-row gap-3 mt-6 h-auto sm:h-12 text-sm'>
            <button className='bg-blue-500 hover:bg-blue-600 flex justify-center rounded-xl py-2.5 sm:py-0 items-center gap-1.5 font-bold w-full text-white shadow-md shadow-blue-50 transition-all'>
              <ShoppingCart className='h-5 w-5 fill-current' /> Add To Cart
            </button>
            <button className='flex justify-center items-center gap-1.5 text-blue-500 border border-blue-200 bg-white rounded-xl py-2.5 sm:py-0 font-bold w-full hover:bg-blue-50 transition-colors'>
              <Heart className='h-5 w-5' /> Add to Wishlist
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Pdp;
































