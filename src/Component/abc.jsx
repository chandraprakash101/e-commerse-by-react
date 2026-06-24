import React, { useEffect, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Searchbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryArr, setSearchQueryArr] = useState([]);
  const [activeSuggestionInd, setActiveSuggestionInd] = useState(-1);
  const navigate = useNavigate();

  // 1. Dropdown Container aur saare items ke liye Refs banayein
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  // .trim() ko input se hata diya taaki type karte waqt beech me space block na ho
  function handleText(e) {
    let inputText = e.target.value; 
    setSearchQuery(inputText);
    setActiveSuggestionInd(-1); // Naya text type hote hi index reset
  }

  async function getData() {
    if (searchQuery.trim().length === 0) return;
    console.log("Api call for ", searchQuery);
    const data = await fetch(`https://dummyjson.com/products/search?q=${searchQuery}`);
    const jsonData = await data.json();
    setSearchQueryArr(jsonData.products || []);
  }

  // 2. Arrow keys se automatic scroll karne ka magic logic
  useEffect(() => {
    if (activeSuggestionInd >= 0 && itemsRef.current[activeSuggestionInd]) {
      itemsRef.current[activeSuggestionInd].scrollIntoView({
        behavior: 'smooth',  // Smooth scroll hoga
        block: 'nearest',   // Jo sabse pass ka edge hoga wahan tak scroll karega
      });
    }
  }, [activeSuggestionInd]); // Jab bhi index badlega, ye chalega

  function handleKeyDown(e) {
    if (e.key === "ArrowUp") {
      e.preventDefault(); // Input cursor ko start me jaane se rokne ke liye
      console.log("ArrowUp Pressed");
      if (activeSuggestionInd - 1 >= 0) {
        setActiveSuggestionInd(activeSuggestionInd - 1);
      }
    } 
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      console.log("ArrowDown Pressed");
      if (activeSuggestionInd + 1 < searchQueryArr.length) {
        setActiveSuggestionInd(activeSuggestionInd + 1);
      }
    } 
    else if (e.key === "Enter") {
      // BUG FIX: Pehle check karo ki kya koi item select hai bhi ya nahi (-1 par block karo)
      if (activeSuggestionInd >= 0 && searchQueryArr[activeSuggestionInd]) {
        const selectedQuery = searchQueryArr[activeSuggestionInd];
        setSearchQuery(selectedQuery.title);
        setSearchQueryArr([]);
        navigate(`/product/${selectedQuery.id}`);
      } else if (searchQuery.trim().length > 0) {
        // Agar kuch select nahi hai aur sirf enter mara, toh search page par bhej do
        navigate(`/search?q=${searchQuery}`);
        setSearchQueryArr([]);
      }
    }
  }

  function clearInputText() {
    setSearchQuery("");
    setSearchQueryArr([]);
    setActiveSuggestionInd(-1);
  }

  let timerId = useRef(null);
  useEffect(() => {
    if (timerId.current) {
      clearTimeout(timerId.current);
    }
    if (searchQuery.trim().length > 0) {
      timerId.current = setTimeout(() => {
        getData();
      }, 400);
    } else {
      setSearchQueryArr([]);
    }

    return () => clearTimeout(timerId.current);
  }, [searchQuery]);

  return (
    <div className='w-full h-full relative items-center'>
      <div className='w-full h-full flex relative items-center'>
        <input 
          onChange={handleText} 
          onKeyDown={handleKeyDown}
          value={searchQuery}
          className='w-full h-full border-none outline-none px-2 bg-gray-100 text-gray-900 rounded-xl focus:ring-2 focus:ring-indigo-500'
          type="text"
          placeholder='Enter Your Items ' 
        />
        {searchQuery.trim().length !== 0 ? (
          <X className='absolute right-2 cursor-pointer text-gray-500' onClick={clearInputText}/>
        ) : (
          <Search className='absolute right-2 text-gray-400' />
        )}
      </div>

      {/* 3. SCROLLBAR HIDE CLASSES: Is div me scrollbar chhipane ke liye custom classes lagayi hain */}
      {searchQuery.trim().length !== 0 && searchQueryArr.length > 0 && (
        <div 
          ref={containerRef}
          className='absolute left-0 top-full w-full overflow-y-auto max-h-60 flex flex-col gap-1 bg-white shadow-xl rounded-b-sm z-50 border border-t-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'
        >
          {searchQueryArr.map((productArr, index) => {
            return (
              <Link 
                to={`/product/${productArr.id}`} 
                key={productArr.id}
                // Har item ka reference array me store kar rahe hain
                ref={el => itemsRef.current[index] = el}
                onClick={() => setSearchQueryArr([])}
              >
                <p className={`m-1 ${activeSuggestionInd === index ? "bg-indigo-500 text-white" : "bg-gray-100 text-gray-800"} rounded-sm cursor-pointer p-2 hover:bg-indigo-400 hover:text-white text-sm transition-colors`} >
                  {productArr.title}
                </p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

// export default Searchbar;