import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import Search from './Pages/Exercicio1/Search'
import Header from './components/Header'
import Home from './pages/Home'
import Lista from './pages/Lista'
import Api  from './pages/exercicio2/Api'

function App() {
  return(
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/listaDeExercicios" element={<Lista/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/api/*" element={<Api />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
