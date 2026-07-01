import React, { useContext, useEffect, useRef, useState } from 'react'
import { Search, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../Store/ThemeProvider';

const Searchbar = () => {
  const {theme, setTheme} = useContext(ThemeContext);
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
    <div className={`${theme == 'light' ? "bg-gray-200 text-gray-900" : "bg-gray-800 text-[#F7F7F7]"} w-full h-full relative items-center`}>
      <div className='w-full h-full flex relative items-center'>
        <input onChange={handleText} 
        onKeyDown={handleKeyDown}
        value={searchQuery}
        className={`w-full h-full border-none outline-none px-2 rounded-xl focus:ring-2 focus:ring-indigo-500 ${theme == 'light' ? "bg-gray-100 text-gray-900" : "bg-gray-700 text-[#F7F7F7]"}`}
          type="text"
          placeholder='Enter Your Items ' />
        {searchQuery.trim().length != 0 ? <X className={`absolute right-2 cursor-pointer ${theme == 'dark' ? 'text-[#F7F7F7]' : 'text-gray-900'}`}/> : <Search className={`absolute right-2 ${theme == 'dark' ? 'text-[#F7F7F7]' : 'text-gray-900'}`} />}
      </div>
      <div className={`w-full ${theme == 'light' ? "bg-gray-200 text-gray-900" : "bg-gray-900 text-[#F7F7F7]"} overflow-y-auto max-h-70 flex flex-col gap-1 shadow-xl rounded-b-sm`}>
        {
          searchQuery.length != 0 && searchQueryArr.map((productArr, index) => {
            return (
              <Link to={`/product/${productArr.id}`}>
                <p key={productArr.id} className={`m-1 rounded-sm cursor-pointer p-1 transition-colors ${activeSuggestionInd == index ? "bg-indigo-400 text-white" : theme == 'light' ? "bg-gray-200 text-gray-900 hover:bg-indigo-400 hover:text-white" : "bg-gray-800 text-[#F7F7F7] hover:bg-indigo-400 hover:text-white"}`} >{productArr.title}</p>
              </Link>
            )
          })
        }
      </div>
    </div>
  )
}

export default Searchbar
