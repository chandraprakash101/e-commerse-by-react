import React from 'react'
import Home from './Screen/Home'
import { Route, Routes } from 'react-router-dom'
import Pdp from './Screen/Pdp'
import ThemeProvider from './Store/ThemeProvider'
import ProductCategory from './Screen/ProductCategory'

const App = () => {
  return (

    <ThemeProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<Pdp />} />
        <Route path='/productCategory/:category' element={<ProductCategory />} />
      </Routes>
    </ThemeProvider>

  )
}

export default App
