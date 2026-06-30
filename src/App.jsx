import React from 'react'
import Home from './Screen/Home'
import { Route, Routes } from 'react-router-dom'
import Pdp from './Screen/Pdp'
import ThemeProvider from './Store/ThemeProvider'

const App = () => {
  return (
 
      <ThemeProvider>
        <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/product/:id' element={<Pdp/>} />
      </Routes>
      </ThemeProvider>
    
  )
}

export default App
