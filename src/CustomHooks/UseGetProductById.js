import React from 'react';
import { useState, useEffect } from 'react'

const UseGetProductById = (id) => {

    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(true);
   

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
    setProductData(null) // help 
      getData();
    }, [id]);

  return {
    productData,
    loading,
  }
}

export default UseGetProductById
