import React from 'react'

const Home = () => {
  return (
    <div className='section flex justify-center items-center flex-col'>
        <h1 className='text-7xl'>Exercícios React</h1>
        <p className='text-2xl'>Navegue pela <span className='text-purple-700 underline underline-offset-4'><a href="/listaDeExercicios">lista de exercicios</a></span></p>
    </div>
  )
}

export default Home