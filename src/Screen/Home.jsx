import React from 'react'
import Navbar from '../Component/Navbar'
import Crousel from '../Component/Crousel'

const Home = () => {
  return (
    <div>
     <div>
      <Navbar />
     </div>
     <div className='mt-14'>
      <Crousel />
     </div>
    </div>
  )
}

export default Home
