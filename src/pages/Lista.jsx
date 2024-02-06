import React from 'react'
import './lista.css'

const Lista = () => {
  return (
    <div className='section flex flex-col justify-center items-center'>
        <h1 className='text-5xl mb-5'>Lista de Exercícios</h1>
        <ul>
            <li>1º - <a href="/search">Search Filter</a></li>
            <li>2º - <a href=""></a></li>
        </ul>
    </div>
  )
}

export default Lista