import React, { useEffect, useRef, useState } from 'react'
import { Search } from 'lucide-react'

const Searchbar = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryArr, setSearchQueryArr] = useState([]);

  function handleText(e) {
    let inputText = e.target.value.trim();
    setSearchQuery(inputText);
  }
  async function getData() {
    if (searchQuery.length === 0) return;
    console.log("Api call for ", searchQuery)
    const data = await fetch(`https://dummyjson.com/products/search?q=${searchQuery}`)
    const jsonData = await data.json();
    setSearchQueryArr(jsonData.products);
    console.log(jsonData.products)
  }

  let timerId = useRef(null)
  useEffect(() => {
    if(timerId.current){
      clearTimeout(timerId.current);
    }
    timerId.current = setTimeout(()=>{
       getData();
    },400)
   
  }, [searchQuery])

  return (
    <div className='w-full h-full  relative items-center'>
      <div className='w-full h-full flex relative items-center'>
        <input onChange={handleText} className='w-full h-full border-none outline-none  px-2 bg-gray-100 text-gray-900 rounded-xl focus:ring-2 focus:ring-indigo-500'
          type="text"
          placeholder='Enter Your Items ' />
        <Search className='absolute right-2' />
      </div>
      <div className='w-full overflow-y-auto max-h-70 flex flex-col gap-1 bg-white shadow-xl rounded-b-sm'>
        {
          searchQuery.length != 0 && searchQueryArr.map((productArr) => {
            return (
              <p key={productArr.id} className='m-1 bg-gray-200 rounded-sm cursor-pointer p-1' >{productArr.title}</p>
            )
          })
        }
      </div>
    </div>
  )
}

export default Searchbar
