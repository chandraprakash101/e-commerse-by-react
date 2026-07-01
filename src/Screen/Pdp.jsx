
import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import PdpScaleton from '../Scaleton/PdpScaleton';
import { Star, Truck, ShieldCheck, RotateCcw, PackageCheck } from 'lucide-react';
import UseGetProductById from '../CustomHooks/UseGetProductById';
import ReviewAccordion from '../Component/ReviewAccordian';
import { ThemeContext } from '../Store/ThemeProvider';

const Pdp = () => {
  const { id } = useParams();

  const {productData, loading} = UseGetProductById(id);
  const [activeImgInd, setActiveImageInd] = useState(0);
   const [isImgLoading, setIsImgLoading] = useState(true);
   const {theme, setTheme} = useContext(ThemeContext);

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
    <div className={`w-full rounded-2xl mt-12 p-5 overflow-y-auto ${theme == 'light' ? "bg-gray-50" : "bg-gray-900"}`}>
      <Link to="/">
        <div className={`flex py-4 gap-2 font-bold ${theme == 'light' ? "text-blue-500" : "text-blue-400"}`}><ChevronLeft /><p> Back to products</p></div>
      </Link>
      
      <div className={`md:flex gap-1 rounded-2xl w-full ${theme == 'light' ? "bg-white" : "bg-gray-800"}`}>
        {/* first container */}
        <div className={`md:w-[50%] md:flex gap-3 md:py-2.5 md:pl-2.5 md:justify-items-start ${theme == 'light' ? "bg-white" : "bg-gray-800"}`}>
          
          {/* Main Showcase Image Box */}
          <div className={`md:h-120 border rounded-2xl relative aspect-square flex items-center justify-center overflow-hidden w-full ${theme == 'light' ? "bg-gray-100 border-gray-300" : "bg-gray-700 border-gray-600"}`}>
            
            {/* FIXED LOGIC: Jab tak real image backend/network se download ho rahi hai, tab tak ye inner skeleton placeholder dikhega */}
            {isImgLoading && (
              <div className={`absolute inset-0 animate-pulse rounded-2xl z-0 ${theme == 'light' ? "bg-gray-200" : "bg-gray-600"}`} />
            )}

            <ChevronLeft onClick={handleLeft} className={`absolute left-2 top-[50%] -translate-y-1/2 rounded-full shadow-md p-1 h-8 w-8 cursor-pointer z-10 ${theme == 'light' ? "bg-white text-gray-700" : "bg-gray-700 text-[#F7F7F7]"}`} />
            
            <img 
              className={`m-2 h-full p-5 object-contain transition-opacity duration-300 ${isImgLoading ? 'opacity-0' : 'opacity-100'}`} 
              src={productData?.images[activeImgInd]} 
              alt={productData?.title}
              // ONLOAD MAGIC: Browser jaise hi photo download complete karega, ye event fire hoga aur loading false ho jayegi
              onLoad={() => setIsImgLoading(false)} 
            />
            
            <ChevronRight onClick={handleRight} className={`absolute right-2 top-[50%] -translate-y-1/2 rounded-full shadow-md p-1 h-8 w-8 cursor-pointer z-10 ${theme == 'light' ? "bg-white text-gray-700" : "bg-gray-700 text-[#F7F7F7]"}`} />
          </div>

          {/* Thumbnails */}
          <div className={`w-full md:w-18 flex md:mr-2 gap-2 p-1 md:flex-col overflow-x-auto md:overflow-y-auto scrollbar-none shrink-0`}>
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
                    activeImgInd === index ? theme == 'light' ? "border-blue-400 ring-2 ring-blue-50" : "border-blue-500 ring-2 ring-blue-900" : theme == 'light' ? "border-gray-200" : "border-gray-600"
                  }`}
                >
                  <img src={img} alt="" className='h-full w-full object-contain mix-blend-multiply' />
                </div>
              )
            })}
          </div>
        </div>

        {/* Second container */}
        <div className={`md:mx-2.5 py-2.5 md:w-[50%] p-4 ${theme == 'light' ? "bg-white" : "bg-gray-800"}`}>
          <div className='flex gap-5 text-xs py-2'>
            <span className={`font-bold rounded-xl p-1.5 ${theme == 'light' ? "bg-gray-100 text-gray-600" : "bg-gray-700 text-gray-300"}`}>{productData?.category}</span>
            <span className={`font-bold rounded-xl p-1.5 ${theme == 'light' ? "bg-blue-50 text-blue-600" : "bg-blue-900 text-blue-300"}`}>{productData?.brand}</span>
          </div>
          
          <h2 className={`font-bold text-xl py-2 ${theme == 'light' ? "text-gray-800" : "text-[#F7F7F7]"}`}>{productData?.title}</h2>
          
          <div className='flex gap-4 py-2 items-center'>
            <div className={`flex items-center gap-1 rounded-full px-2.5 py-1 border ${theme == 'light' ? "bg-amber-50 text-amber-600 border-amber-200" : "bg-amber-900 text-amber-300 border-amber-700"}`}>
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm font-bold">{productData?.rating}</span>
            </div>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              productData?.stock > 0 ? theme == 'light' ? "bg-green-50 text-green-700" : "bg-green-900 text-green-300" : theme == 'light' ? "bg-red-50 text-red-700" : "bg-red-900 text-red-300"
            }`}>In stock: {productData?.stock}</span>
          </div>

          <div className={`border px-3 py-2 rounded-xl flex gap-3 items-baseline ${theme == 'light' ? "bg-gray-50 border-gray-100" : "bg-gray-700 border-gray-600"}`}>
            <span className={`text-3xl font-black ${theme == 'light' ? "text-gray-900" : "text-[#F7F7F7]"}`}>${discountedPrice?.toFixed(2)}</span>
            <span className={`line-through text-sm ${theme == 'light' ? "text-gray-400" : "text-gray-500"}`}>${originalPrice?.toFixed(2)}</span>
          </div>

          <div className={`py-2 font-medium text-sm leading-relaxed ${theme == 'light' ? "text-gray-600" : "text-gray-400"}`}>
            <p>{productData?.description}</p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {infoItems.map((item) => (
              <div key={item.label} className={`flex items-start gap-3 rounded-xl border p-3 transition-colors ${theme == 'light' ? "border-gray-100 bg-white hover:border-blue-400" : "border-gray-700 bg-gray-700 hover:border-blue-500"}`}>
                <item.icon className={`mt-0.5 h-5 w-5 shrink-0 ${theme == 'light' ? "text-blue-600" : "text-blue-400"}`} />
                <div>
                  <p className={`text-xs font-medium ${theme == 'light' ? "text-gray-400" : "text-gray-500"}`}>{item.label}</p>
                  <p className={`text-sm font-semibold ${theme == 'light' ? "text-gray-800" : "text-[#F7F7F7]"}`}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className='flex flex-col sm:flex-row gap-3 mt-6 h-auto sm:h-12 text-sm'>
            <button className={`hover:opacity-90 flex justify-center rounded-xl py-2.5 sm:py-0 items-center gap-1.5 font-bold w-full transition-all ${theme == 'light' ? "bg-blue-500 hover:bg-blue-600 text-white shadow-md shadow-blue-50" : "bg-blue-600 hover:bg-blue-700 text-white"}`}>
              <ShoppingCart className='h-5 w-5 fill-current' /> Add To Cart
            </button>
            <button className={`flex justify-center items-center gap-1.5 border rounded-xl py-2.5 sm:py-0 font-bold w-full transition-colors ${theme == 'light' ? "text-blue-500 border-blue-200 bg-white hover:bg-blue-50" : "text-blue-400 border-blue-700 bg-gray-700 hover:bg-gray-600"}`}>
              <Heart className='h-5 w-5' /> Add to Wishlist
            </button>
          </div>
        </div>

      </div>
      <ReviewAccordion reviewData={productData.reviews} />
    </div>
  )
}

export default Pdp;