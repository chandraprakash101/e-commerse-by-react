
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import PdpScaleton from '../Scaleton/PdpScaleton';
import { Star, Truck, ShieldCheck, RotateCcw, PackageCheck } from 'lucide-react';

const Pdp = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [activeImgInd, setActiveImageInd] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // NEW STATE: Image download ho rahi hai ya nahi, ye check karne ke liye
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

  async function getData() {
    try {
      setLoading(true);
      const apiRes = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await apiRes.json();
      setProductData(data);
    } catch (error) {
      console.log("Error : ", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
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
























// import React, { useEffect, useState } from "react"
// import { useParams, useNavigate } from "react-router-dom" // useParams aur useNavigate ko import kiya
// import {
//   ChevronLeft,
//   ChevronRight,
//   Star,
//   ShoppingCart,
//   Heart,
//   Truck,
//   ShieldCheck,
//   RotateCcw,
//   PackageCheck,
// } from "lucide-react"
// import PdpScaleton from "../Scaleton/PdpScaleton";

// export default function Pdp() {
//   // FIX 1: Prop se 'id' lene ke bajaye URL se real ID nikali (e.g., /product/7)
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [productData, setProductData] = useState(null)
//   const [activeImage, setActiveImage] = useState(0)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     let ignore = false
    
//     async function getData() {
//       if (!id) return; // Safety check
//       setLoading(true)
//       try {
//         const apiRes = await fetch(`https://dummyjson.com/products/${id}`)
//         const data = await apiRes.json()
//         if (!ignore) {
//           setProductData(data)
//           setActiveImage(0) // Naya product aate hi pehli image par reset karein
//         }
//       } catch (err) {
//         console.log("PDP fetch error:", err.message)
//       } finally {
//         if (!ignore) setLoading(false)
//       }
//     }
    
//     getData()
//     window.scrollTo(0, 0); // Page load hote hi screen automatically top par scroll ho jaye
    
//     return () => {
//       ignore = true
//     }
//   }, [id]) // dependency me 'id' ka hona zaroori hai taaki URL badalne par fetch dubara chale

//   // --- LOADING SKELETON STATE ---
//   if (loading || !productData) {
//     return (
//       <PdpScaleton />
//     )
//   }

//   // FIX 2: Images Array safe fallback setup
//   const images = productData.images && productData.images.length > 0 
//     ? productData.images 
//     : [productData.thumbnail]

//   // Image change functions with correct bounds
//   const goPrev = (e) => {
//     e.stopPropagation();
//     setActiveImage((i) => (i === 0 ? images.length - 1 : i - 1))
//   }
  
//   const goNext = (e) => {
//     e.stopPropagation();
//     setActiveImage((i) => (i === images.length - 1 ? 0 : i + 1))
//   }

//   const discounted = productData.price
//   const original = productData.discountPercentage
//     ? productData.price / (1 - productData.discountPercentage / 100)
//     : productData.price

//   const infoItems = [
//     { icon: PackageCheck, label: "Availability", value: productData.availabilityStatus },
//     { icon: Truck, label: "Shipping", value: productData.shippingInformation },
//     { icon: ShieldCheck, label: "Warranty", value: productData.warrantyInformation },
//     { icon: RotateCcw, label: "Returns", value: productData.returnPolicy },
//   ]

//   return (
//     <div className="mx-auto max-w-6xl px-4 py-8 md:py-12 mt-16">
//       {/* Back Button */}
//       <button 
//         onClick={() => navigate(-1)} 
//         className="mb-6 text-sm font-medium text-gray-500 hover:text-blue-600 flex items-center gap-1 transition-colors"
//       >
//         <ChevronLeft size={16} /> Back
//       </button>

//       <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        
//         {/* --- LEFT COLUMN: GALLERY --- */}
//         <div className="flex flex-col-reverse gap-4 md:flex-row">
          
//           {/* Thumbnails */}
//           <div className="flex gap-3 overflow-x-auto md:max-h-[460px] md:flex-col md:overflow-y-auto scrollbar-none">
//             {images.map((img, index) => (
//               <button
//                 key={index}
//                 onClick={() => setActiveImage(index)}
//                 aria-label={`View image ${index + 1}`}
//                 className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 bg-white p-1 transition-all duration-200 hover:border-blue-600 hover:shadow-md ${
//                   activeImage === index ? "border-blue-600 ring-2 ring-blue-100" : "border-gray-200"
//                 }`}
//               >
//                 <img
//                   src={img || "/placeholder.svg"}
//                   alt={`${productData.title} thumbnail ${index + 1}`}
//                   className="h-full w-full object-contain mix-blend-multiply"
//                 />
//               </button>
//             ))}
//           </div>

//           {/* Main Big Image */}
//           <div className="group relative flex-1">
//             <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 relative">
//               <img
//                 src={images[activeImage] || "/placeholder.svg"}
//                 alt={productData.title}
//                 className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
//               />
//               {productData.discountPercentage > 0 && (
//                 <span className="absolute left-4 top-4 rounded-full bg-red-500 px-2.5 py-1 text-xs font-bold text-white z-10">
//                   -{Math.round(productData.discountPercentage)}%
//                 </span>
//               )}
//             </div>
            
//             {/* Arrows show tab logic check only if multiple images exist */}
//             {images.length > 1 && (
//               <>
//                 <button
//                   onClick={goPrev}
//                   className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-gray-200 bg-white/90 p-2 text-gray-700 shadow-sm transition-all hover:bg-blue-600 hover:text-white z-20"
//                 >
//                   <ChevronLeft className="h-5 w-5" />
//                 </button>
//                 <button
//                   onClick={goNext}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-gray-200 bg-white/90 p-2 text-gray-700 shadow-sm transition-all hover:bg-blue-600 hover:text-white z-20"
//                 >
//                   <ChevronRight className="h-5 w-5" />
//                 </button>
//               </>
//             )}
//           </div>
//         </div>

//         {/* --- RIGHT COLUMN: DETAILS INFO --- */}
//         <div className="flex flex-col justify-between">
//           <div>
//             <div className="flex items-center gap-2">
//               {productData.brand && (
//                 <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
//                   {productData.brand}
//                 </span>
//               )}
//               <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
//                 {productData.category}
//               </span>
//             </div>

//             <h1 className="mt-3 text-2xl font-black leading-tight text-gray-900 text-balance md:text-3xl">
//               {productData.title}
//             </h1>

//             <div className="mt-3 flex items-center gap-4">
//               <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-amber-600 border border-amber-200">
//                 <Star className="h-4 w-4 fill-current" />
//                 <span className="text-sm font-bold">{productData.rating}</span>
//               </div>
//               <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
//                 productData.stock > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
//               }`}>
//                 In stock: {productData.stock}
//               </span>
//             </div>

//             <div className="mt-5 flex items-baseline gap-3 p-4 bg-gray-50 border border-gray-100 rounded-xl">
//               <span className="text-3xl font-black text-gray-900">${discounted.toFixed(2)}</span>
//               {productData.discountPercentage > 0 && (
//                 <span className="text-sm text-gray-400 line-through">${original.toFixed(2)}</span>
//               )}
//             </div>

//             <p className="mt-5 leading-relaxed text-gray-600 text-sm">{productData.description}</p>

//             <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
//               {infoItems.map((item) => (
//                 <div
//                   key={item.label}
//                   className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-3 transition-colors hover:border-blue-400"
//                 >
//                   <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
//                   <div>
//                     <p className="text-xs font-medium text-gray-400">{item.label}</p>
//                     <p className="text-sm font-semibold text-gray-800">{item.value}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="mt-8 flex flex-col gap-3 sm:flex-row">
//             <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-bold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md active:scale-[0.98]">
//               <ShoppingCart className="h-5 w-5" />
//               Add To Cart
//             </button>
//             <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-blue-600 bg-white px-6 py-3.5 font-bold text-blue-600 transition-all hover:bg-blue-50 active:scale-[0.98]">
//               <Heart className="h-5 w-5" />
//               Add to Wishlist
//             </button>
//           </div>
//         </div>

//       </div>
//     </div>
//   )
// }





// import React, { useEffect, useState } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import { ChevronLeft, ChevronRight, Star, ShoppingCart, Heart, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

// const Pdp = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [productData, setProductData] = useState(null);
//   const [loading, setLoading] = useState(true);
  
//   // NEW STATE: Badi screen par kaun si image dikhegi, uske liye index track karenge
//   const [activeImgIdx, setActiveImgIdx] = useState(0);

//   async function getData() {
//     try {
//       setLoading(true);
//       const apiRes = await fetch(`https://dummyjson.com/products/${id}`);
//       const data = await apiRes.json();
//       setProductData(data);
//     } catch (error) {
//       console.error("Error fetching product data:", error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     getData();
//     window.scrollTo(0, 0); // Page badalne par humesha top par le jaye
//   }, [id]);

//   // Left/Right Arrow button handlers for image gallery
//   const handlePrevImg = () => {
//     if (!productData?.images) return;
//     setActiveImgIdx((prev) => (prev - 1 + productData.images.length) % productData.images.length);
//   };

//   const handleNextImg = () => {
//     if (!productData?.images) return;
//     setActiveImgIdx((prev) => (prev + 1) % productData.images.length);
//   };

//   // 1. Loading State Check (Crucial for preventing blank or half-rendered screens)
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 mt-12">
//         <div className="animate-spin  rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
//       </div>
//     );
//   }

//   if (!productData) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 mt-12">
//         <p className="text-gray-500 font-medium">Product not found!</p>
//       </div>
//     );
//   }

//   // Original price calculation before discount
//   const originalPrice = (productData.price / (1 - productData.discountPercentage / 100)).toFixed(2);

//   return (
//     <div className="min-h-screen bg-gray-50 mt-12 py-8 px-4 sm:px-6 lg:px-8">
//       {/* Back Button */}
//       <button 
//         onClick={() => navigate(-1)} 
//         className="mb-6 text-sm font-medium text-gray-500 hover:text-indigo-600 flex items-center gap-1 transition-colors"
//       >
//         <ChevronLeft size={16} /> Back to Products
//       </button>

//       {/* Main Grid: Image Gallery Left side, Content Right Side */}
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-white p-4 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
        
//         {/* --- LEFT COLUMN: IMAGE GALLERY --- */}
//         <div className="flex flex-col md:flex-row-reverse gap-4">
          
//           {/* Main Big Image Box */}
//           <div className="w-full aspect-square bg-gray-50 rounded-xl overflow-hidden relative border border-gray-100 flex items-center justify-center p-4 group">
//             <img 
//               src={productData.images ? productData.images[activeImgIdx] : productData.thumbnail} 
//               alt={productData.title} 
//               className="max-h-full max-w-full object-contain mix-blend-multiply"
//             />
            
//             {/* Gallery Arrows (Only visible when multiple images exist) */}
//             {productData.images && productData.images.length > 1 && (
//               <>
//                 <button 
//                   onClick={handlePrevImg}
//                   className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md text-gray-700 transition-colors"
//                 >
//                   <ChevronLeft size={20} />
//                 </button>
//                 <button 
//                   onClick={handleNextImg}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md text-gray-700 transition-colors"
//                 >
//                   <ChevronRight size={20} />
//                 </button>
//               </>
//             )}

//             {/* Discount Percentage Badge */}
//             <span className="absolute top-4 left-4 bg-red-500 text-white font-bold text-xs px-2.5 py-1 rounded-md">
//               {Math.round(productData.discountPercentage)}% OFF
//             </span>
//           </div>

//           {/* Thumbnails Row */}
//           {productData.images && productData.images.length > 1 && (
//             <div className="flex md:flex-col gap-3 overflow-x-auto pb-2 snap-x scrollbar-none">
//               {productData.images.map((img, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setActiveImgIdx(index)}
//                   className={`h-16 w-16 sm:h-20 sm:w-20 rounded-lg overflow-hidden border-2 bg-gray-50 flex-shrink-0 p-1 snap-start transition-all ${
//                     activeImgIdx === index ? 'border-indigo-600 scale-95 shadow-sm' : 'border-gray-200 hover:border-gray-400'
//                   }`}
//                 >
//                   <img src={img} alt={`view-${index}`} className="h-full w-full object-contain mix-blend-multiply" />
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* --- RIGHT COLUMN: PRODUCT INFO --- */}
//         <div className="flex flex-col justify-between pt-2">
//           <div>
//             {/* Brand Name */}
//             <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
//               {productData.brand || "Generic"}
//             </span>

//             {/* Title & Rating */}
//             <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-3">{productData.title}</h1>
            
//             <div className="flex items-center gap-4 mt-2">
//               <div className="flex items-center gap-1 text-amber-500">
//                 <Star size={16} fill="currentColor" />
//                 <span className="text-sm font-bold text-gray-800">{productData.rating}</span>
//               </div>
//               <span className="text-xs text-gray-400">|</span>
//               <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
//                 productData.stock > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
//               }`}>
//                 {productData.stock > 0 ? `${productData.stock} items left in stock` : 'Out of stock'}
//               </span>
//             </div>

//             {/* Pricing Details */}
//             <div className="mt-5 p-4 bg-gray-50 rounded-xl flex items-baseline gap-3 border border-gray-100">
//               <span className="text-2xl font-black text-gray-900">${productData.price}</span>
//               <span className="text-sm text-gray-400 line-through">${originalPrice}</span>
//               <span className="text-sm text-red-500 font-semibold">
//                 Save ${(originalPrice - productData.price).toFixed(2)}
//               </span>
//             </div>

//             {/* Description */}
//             <div className="mt-5">
//               <h3 className="text-sm font-bold text-gray-900">Description</h3>
//               <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">{productData.description}</p>
//             </div>

//             {/* Trust and Meta Badges */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 pt-6 border-t border-gray-100 text-xs font-medium text-gray-600">
//               <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
//                 <Truck className="text-indigo-600 shrink-0" size={16} />
//                 <span>{productData.shippingInformation || "Fast delivery available"}</span>
//               </div>
//               <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
//                 <ShieldCheck className="text-indigo-600 shrink-0" size={16} />
//                 <span>{productData.warrantyInformation || "Standard brand warranty"}</span>
//               </div>
//               <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
//                 <RefreshCw className="text-indigo-600 shrink-0" size={16} />
//                 <span>{productData.returnPolicy || "Easy 30-day returns available"}</span>
//               </div>
//               <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
//                 <span className={`h-2 w-2 rounded-full ${productData.stock > 5 ? 'bg-green-500' : 'bg-amber-500'}`}></span>
//                 <span>Status: {productData.availabilityStatus || "Available"}</span>
//               </div>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-gray-100">
//             <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-semibold text-sm py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-indigo-100 transition-all">
//               <ShoppingCart size={18} /> Add to Cart
//             </button>
//             <button className="bg-white hover:bg-red-50 hover:text-red-600 hover:border-red-200 border border-gray-200 text-gray-700 font-semibold text-sm py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all">
//               <Heart size={18} /> Add to Wishlist
//             </button>
//           </div>

//         </div>
//       </div>
//     </div>
//   )
// }

// export default Pdp;










