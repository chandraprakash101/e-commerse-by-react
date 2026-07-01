import React from 'react'
import Navbar from '../Component/Navbar'
import Crousel from '../Component/Crousel'
import ProductGrid from '../Component/ProductGrid'
import Footer from '../Component/Footer'

const Home = () => {
  return (
    <div>
     <div>
      <Navbar />
     </div>
     <div className='mt-14'>
      <Crousel />
     </div>
     <div className='w-full'>
      <ProductGrid />
     </div>
     <div>
      <Footer />
     </div>
    </div>
  )
}

export default Home
