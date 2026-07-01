import React, { useState, useEffect } from "react";

const UseGetHomeProductData = (currentPage) => {
  const [productDataArr, setProductDataArr] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getData() {
    try {
      setLoading(true);
      const apiData = await fetch(
        `https://dummyjson.com/products?limit=12&skip=${(currentPage - 1) * 12}`,
      );
      const data = await apiData.json();
    //   setProductDataArr(data.products);
    setProductDataArr(data.products || []);
      setLoading(false);
    } catch (err) {
      setError({ msg: "Something Went Wrong", err });
      console.log("Something went wrong during fetching Home screen data");
    } finally {
      setLoading(false);
    } 
  }

  useEffect(() => {
    setProductDataArr([]);
    getData();
  }, [currentPage]);

  return {productDataArr, loading,error};
};

export default UseGetHomeProductData;
