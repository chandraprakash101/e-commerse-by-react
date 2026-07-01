import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const UseGetProductByCategory = () => {

     const {category} = useParams()
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getData() {
    try{
      console.log("Api call for category data");
    const apiData = await fetch(`https://dummyjson.com/products/category/${category}`);
    const data = await apiData.json();
    console.log("Data = ", data.products)
    setCategoryData(data.products);
    setLoading(false);
    }catch(err){
      console.log("Error to fatching category data");
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    setCategoryData(null);
    getData();
  },[category])

  return {
    categoryData,loading
  }
}

export default UseGetProductByCategory
