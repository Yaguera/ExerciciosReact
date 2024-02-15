import React, { useState } from 'react'

const Api = () => {
    const [apiData, setApiData] = useState(null)
    const [error, setError] = useState(null)

    const fetchApi = (value) => {
        setError(null)
        const result = fetch(`https://rickandmortyapi.com/api/character/${value}`)
        .then((res) => {
            if(!res.ok){
                if(res.status === 404) {
                    throw new Error('Personagem não encontrado')
                }
                throw new Error('Erro ao buscar dados')
            }
            return res.json()
        })
        .then((data) => {
            console.log(data);
            setApiData(data);
        })
        .catch((err) => {
            console.log('Error:', err)
            setApiData(null)
            setError(err.message)
            });
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        const searchTerm = e.target.character_id.value
        console.log(searchTerm)
        fetchApi(searchTerm)
    }

    return (
    <div className='mt-5 flex flex-col justify-center items-center'>
            <form className='flex gap-3' action="" method='get' onSubmit={handleSubmit}>
                <input className='p-3 w-72 outline-none border rounded-lg shadow-sm' type="number" placeholder='Digite o id de um personagem' id='character_id'/>
                <button className='bg-violet-500 p-3 rounded-lg text-sky-100 font-bold hover:bg-slate-300 hover:text-slate-500 ease-in-out duration-200' id='btn_search' >Pesquisar</button>
            </form>
        <div className='mt-8 flex flex-col gap-3'>  
            {error && <p className='text-red-600'><strong>{error}</strong></p>}
            {apiData && (
                <div id='content'> 
                    <img src={apiData.image} alt={`Image of ${apiData.name}`} />
                    <h1 className='font-bold text-3xl'>{apiData.name}</h1>    
                    <p><strong>Status:</strong> {apiData.status}</p>
                    <p><strong>Species:</strong> {apiData.species}</p>
                    <p><strong>Gender:</strong> {apiData.gender}</p>
                    <p><strong>Aparece em {apiData.episode.length} {apiData.episode.length > 1 ? 'episódios' : 'episódio'}</strong></p>

                </div>
            ) }
        </div>
    </div>
    )


}

export default Api
