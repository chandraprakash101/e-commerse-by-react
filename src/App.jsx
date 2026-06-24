import React from 'react'
import Home from './Screen/Home'
import { Route, Routes } from 'react-router-dom'
import Pdp from './Screen/Pdp'

const App = () => {
  return (
 
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/product/:id' element={<Pdp/>} />
      </Routes>
    
  )
}

export default App
