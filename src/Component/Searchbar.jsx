import React, { useEffect, useRef, useState } from 'react'
import { Search, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom';

const Searchbar = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryArr, setSearchQueryArr] = useState([]);
  const [activeSuggestionInd, setActiveSuggestionInd] = useState(-1);
  const navigate = useNavigate();

  function handleText(e) {
    let inputText = e.target.value;
    setSearchQuery(inputText);
    setActiveSuggestionInd(-1)
  }

  async function getData() {
    if (searchQuery.length === 0) return;
    console.log("Api call for ", searchQuery)
    const data = await fetch(`https://dummyjson.com/products/search?q=${searchQuery}`)
    const jsonData = await data.json();
    setSearchQueryArr(jsonData.products);
    console.log(jsonData.products)
  }

  function handleKeyDown(e){
    if(e.key == "ArrowUp"){
      console.log("ArrowUp Pressed")
      if(activeSuggestionInd - 1 > -1){
        setActiveSuggestionInd(activeSuggestionInd - 1)
        searchQueryArr[activeSuggestionInd] 
      }
    }
    else if(e.key == "ArrowDown"){
      console.log("ArrowDown Pressed")
      if(activeSuggestionInd + 1 < searchQueryArr.length){
        setActiveSuggestionInd(activeSuggestionInd + 1)
      }
    }
    else if(e.key == "Enter"){
      if(searchQuery.trim().length == 0 && activeSuggestionInd == -1) return;
      const selectedQuery = searchQueryArr[activeSuggestionInd];
      navigate(`/product/${selectedQuery.id}`)
    }
  }

  function clearInputText(){
    setSearchQuery("");
    setSearchQueryArr([]);
    setActiveSuggestionInd(-1);
  }

  let timerId = useRef(null)
  useEffect(() => {
    if(timerId.current){
      clearTimeout(timerId.current);
    }
    if(searchQuery.trim().length > 0 ){
      timerId.current = setTimeout(()=>{
       getData();
    },400)
    }else{
      setSearchQueryArr([]);
    }

    return () => clearTimeout(timerId.current);
   
  }, [searchQuery])

  return (
    <div className='w-full h-full  relative items-center'>
      <div className='w-full h-full flex relative items-center'>
        <input onChange={handleText} 
        onKeyDown={handleKeyDown}
        value={searchQuery}
        className='w-full h-full border-none outline-none  px-2 bg-gray-100 text-gray-900 rounded-xl focus:ring-2 focus:ring-indigo-500'
          type="text"
          placeholder='Enter Your Items ' />
        {searchQuery.trim().length != 0 ? <X className='absolute right-2 cursor-pointer' onClick={clearInputText}/> : <Search className='absolute right-2' />}
      </div>
      <div className='w-full overflow-y-auto max-h-70 flex flex-col gap-1 bg-white shadow-xl rounded-b-sm'>
        {
          searchQuery.length != 0 && searchQueryArr.map((productArr, index) => {
            return (
              <Link to={`/product/${productArr.id}`}>
                <p key={productArr.id} className={`m-1 ${activeSuggestionInd == index ? "bg-indigo-400 text-white" : "bg-gray-100"} rounded-sm cursor-pointer p-1 hover:bg-indigo-400 hover:text-white`} >{productArr.title}</p>
              </Link>
            )
          })
        }
      </div>
    </div>
  )
}

export default Searchbar
