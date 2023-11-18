import { useState } from 'react'
import './App.css'
import { Home } from './components/Home'
import { Index } from './components/Index'
import {BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/add' element={<Home />} />
      <Route index element={<Index />} />
    
      </Routes>
    </BrowserRouter>
  )
}

export default App
