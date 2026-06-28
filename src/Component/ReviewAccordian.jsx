import React, { useState } from "react";
import { Star, ChevronUp, ChevronDown } from "lucide-react";

const ReviewAccordian = ({ reviewData }) => {
    const[activeIndex, setActiveIndex] = useState(null)

    return (
        <div className=" m-1.5 p-1 bg-gray-100 rounded-xl">
            <h1 className="pl-2 text-2xl font-semibold">Customer Reviews</h1>
            <div className="">
                {reviewData.map((data, index) => {
                    const rating = data.rating;
                    return (
                        <Reviews data={data} rating ={rating} index={index} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
                    );
                })}
            </div>
        </div>
    );
};

export default ReviewAccordian;



const Reviews = ({data, rating, index, activeIndex, setActiveIndex}) => {
    console.log("Rating ",rating)
    console.log("index ",index)
  return (
   <div key={index} className="border border-gray-200 bg-white transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-100 hover:border-blue-300 rounded-xl m-2">

                            {/* === MAIN CONTAINER: Isme hum layout ko padding dete hain === */}
                            <div className="p-4">

                                {/* SECTION 1: HEADER (Yeh hamesha screen par dikhega) */}
                                <div className="w-full flex items-center justify-between cursor-pointer">

                                    {/* Left Side: Name and Stars */}
                                    <div className="flex-1 text-left">
                                        <div className="flex justify-between items-center">
                                            <h2>{data.reviewerName}</h2>
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => {
                                                    return (
                                                        <Star
                                                            key={i}
                                                            size={16}
                                                            className={
                                                                i < rating
                                                                    ? "fill-amber-500 text-amber-500"
                                                                    : "text-gray-300"
                                                            }
                                                        />
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Side: Chevron Arrow */}
                                    <div className="ml-4" onClick={()=>{activeIndex == index ? setActiveIndex(null) : setActiveIndex(index)}}>
                                       {activeIndex == index ?  <ChevronUp /> :  <ChevronDown />}
                                    </div>
                                </div>


                                {/* SECTION 2: HIDDEN BODY (Yeh wala div by-default hide hoga) */}
                                {/* Abhi bas iska layout bana diya hai, baad me hum ispar condition laga kar toggle karenge */}
                                {activeIndex == index && (
                                    <div className={`mt-4 pt-3 border-t border-gray-100`}>

                                    {/* 1. Review ka main content/text message */}
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {data.comment || "This is a placeholder for the hidden review text/content."}
                                    </p>

                                    {/* 2. Meta info section (Date, verified badge etc.) */}
                                    <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
                                        <p>Posted on: {data.date ? new Date(data.date).toLocaleDateString() : "Date Placeholder"}</p>
                                        <span className="text-blue-500 font-medium">✓ Verified Purchase</span>
                                    </div>

                                    {/* 3. Helpful buttons section */}
                                    <div className="mt-4 flex gap-2 text-xs">
                                        <button className="border px-3 py-1.5 rounded hover:bg-gray-50">👍 Helpful</button>
                                        <button className="border px-3 py-1.5 rounded hover:bg-gray-50">👎 Report</button>
                                    </div>

                                </div>
                                )}
                                {/* === HIDDEN BODY ENDS === */}

                            </div>
                        </div>
  )
}




// import React, { useState } from 'react';
//  {/* Hide Area */}
// <div>
//     <p>{data.comment}</p>
// </div>
// import { Star, ThumbsUp, ThumbsDown, ChevronDown } from 'lucide-react';

// // TypeScript ka Review[] type hatakar simple JavaScript array rakha hai
// const mockReviews = [
//   {
//     id: 1,
//     author: "Sarah Johnson",
//     rating: 5,
//     date: "2024-01-15",
//     title: "Amazing quality and fast delivery!",
//     content: "This product exceeded my expectations. The packaging was excellent and it arrived faster than expected. Highly recommend!",
//     helpful: 234,
//     verified: true
//   },
//   {
//     id: 2,
//     author: "Michael Chen",
//     rating: 4,
//     date: "2024-01-10",
//     title: "Great product, minor issue with packaging",
//     content: "The product itself is fantastic and works as described. My only concern was slight damage to the outer box, but the product inside was perfect.",
//     helpful: 156,
//     verified: true
//   },
//   {
//     id: 3,
//     author: "Emma Wilson",
//     rating: 5,
//     date: "2024-01-08",
//     title: "Worth every penny!",
//     content: "I've been using this for a week now and I'm very happy with my purchase. The quality is premium and it really delivers on its promises.",
//     helpful: 89,
//     verified: true
//   },
//   {
//     id: 4,
//     author: "David Kumar",
//     rating: 3,
//     date: "2024-01-05",
//     title: "Good but expected better",
//     content: "It's a decent product. Does what it says but nothing exceptional. Price could be a bit lower for the features offered.",
//     helpful: 45,
//     verified: false
//   }
// ];

// export default function ReviewAccordion() {
//   // TypeScript types (<number | null> aur object structure) hata diye hain
//   const [expandedId, setExpandedId] = useState(null);
//   const [helpful, setHelpful] = useState({});

//   const toggleExpand = (id) => {
//     setExpandedId(expandedId === id ? null : id);
//   };

//   const handleHelpful = (id) => {
//     setHelpful(prev => ({
//       ...prev,
//       [id]: !prev[id]
//     }));
//   };

//   const averageRating = (mockReviews.reduce((sum, r) => sum + r.rating, 0) / mockReviews.length).toFixed(1);

//   return (
//     <div className="w-full max-w-4xl mx-auto py-8">
//       {/* Header */}
//       <div className="mb-8">
//         <h2 className="text-2xl font-bold text-gray-900 mb-4">Customer Reviews</h2>

//         {/* Rating Summary */}
//         <div className="flex items-center gap-6 p-6 bg-blue-50 rounded-xl">
//           <div className="text-center">
//             <div className="text-4xl font-bold text-blue-600 mb-2">{averageRating}</div>
//             <div className="flex gap-1 mb-2">
//               {[...Array(5)].map((_, i) => (
//                 <Star
//                   key={i}
//                   size={18}
//                   className={i < Math.round(parseFloat(averageRating)) ? "fill-blue-600 text-blue-600" : "text-gray-300"}
//                 />
//               ))}
//             </div>
//             <p className="text-sm text-gray-600">Based on {mockReviews.length} reviews</p>
//           </div>
//         </div>
//       </div>

//       {/* Reviews List */}
//       <div className="space-y-3">
//         {mockReviews.map((review) => (
//           <div
//             key={review.id}
//             className="border border-gray-200 rounded-lg overflow-hidden bg-white transition-all duration-200 hover:border-blue-300 hover:shadow-md"
//           >
//             {/* Review Header - Always Visible */}
//             <button
//               onClick={() => toggleExpand(review.id)}
//               className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
//             >
//               <div className="flex items-center gap-4 flex-1 text-left">
//                 {/* Rating Stars */}
//                 <div className="flex gap-1">
//                   {[...Array(5)].map((_, i) => (
//                     <Star
//                       key={i}
//                       size={16}
//                       className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
//                     />
//                   ))}
//                 </div>

//                 {/* Review Title & Author */}
//                 <div className="flex-1">
//                   <p className="font-semibold text-gray-900">{review.title}</p>
//                   <p className="text-sm text-gray-500">
//                     by {review.author} {review.verified && <span className="text-blue-600 font-medium">✓ Verified</span>}
//                   </p>
//                 </div>

//                 {/* Date */}
//                 <p className="text-sm text-gray-500 whitespace-nowrap ml-4">
//                   {new Date(review.date).toLocaleDateString()}
//                 </p>
//               </div>

//               {/* Chevron */}
//               <ChevronDown
//                 size={20}
//                 className={`text-blue-600 transition-transform duration-300 ml-4 ${
//                   expandedId === review.id ? 'rotate-180' : ''
//                 }`}
//               />
//             </button>

//             {/* Review Content - Expandable */}
//             {expandedId === review.id && (
//               <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
//                 <p className="text-gray-700 mb-4 leading-relaxed">{review.content}</p>

//                 {/* Helpful Votes */}
//                 <div className="flex items-center gap-4">
//                   <span className="text-sm text-gray-600">Was this helpful?</span>

//                   <button
//                     onClick={() => handleHelpful(review.id)}
//                     className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
//                       helpful[review.id]
//                         ? 'border-blue-600 bg-blue-50 text-blue-600'
//                         : 'border-gray-200 text-gray-600 hover:border-blue-300'
//                     }`}
//                   >
//                     <ThumbsUp size={16} />
//                     <span className="text-sm font-medium">{review.helpful + (helpful[review.id] ? 1 : 0)}</span>
//                   </button>

//                   <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 text-gray-600 hover:border-red-300 transition-all">
//                     <ThumbsDown size={16} />
//                     <span className="text-sm font-medium">0</span>
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Load More */}
//       <button className="w-full mt-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
//         Load More Reviews
//       </button>
//     </div>
//   );
// }
