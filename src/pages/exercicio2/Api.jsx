import React, { useState, useEffect } from 'react'

const Api = () => {
    const [apiData, setApiData] = useState(null);
    const [error, setError] = useState(null);
    const [isMounted, setIsMounted] = useState(true); // Adicione este sinalizador

    const [showDetails, setShowDetails] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [currentPage, setCurrentPage] = useState(2);

    const handleHover = (item) => {
    setCurrentItem(item);
    setShowDetails(true);
    };

    const handlerHoverOut = (item) => {
        setCurrentItem(null);
        setShowDetails(false)
    }

    const fetchApi = async ({name, species, gender, status, page = 1}) => {
        setError(null)
        try {
            const res = await fetch(`https://rickandmortyapi.com/api/character/?name=${name}&species=${species}&gender=${gender}&status=${status}&page=${page}`);
            if(!res.ok){
                if(res.status === 404) {
                    throw new Error('Personagem não encontrado')
                }
                throw new Error('Erro ao buscar dados')
            }
            const data = await res.json();
            console.log(data.results);
            if (isMounted) setApiData(data.results); // Verifique se o componente ainda está montado
        } catch (err) {
            console.log('Error:', err);
            if (isMounted) { // Verifique se o componente ainda está montado
                setApiData(null);
                setError(err.message);
            }
        }
    }

    const defaultFilter = {
        name: '',
        species: '',
        gender:'',
        status: '',
        page: 1
    }

    async function loadMore() {
        setCurrentPage(prevPage => prevPage + 1);
        const res = await fetch(`https://rickandmortyapi.com/api/character/?name=${defaultFilter.name}&species=${defaultFilter.species}&gender=${defaultFilter.gender}&status=${defaultFilter.status}&page=${currentPage}`);
        if(!res.ok){
            if(res.status === 404) {
                throw new Error('Personagem não encontrado')
            }
            throw new Error('Erro ao buscar dados')
        }
        const data = await res.json();
        setApiData(prevData => [...(Array.isArray(prevData) ? prevData : []), ...data.results]);
    }

    useEffect(() => {
        fetchApi(defaultFilter);
        return () => { setIsMounted(false) }; // Atualize o sinalizador quando o componente for desmontado
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault()
        const searchTerm = e.target.character_id.value
        console.log(searchTerm)
        fetchApi(defaultFilter)
    }

    return (
    <div className='mt-5 flex flex-col justify-center items-center'>
            <form className='flex gap-3' action="" method='get' onSubmit={handleSubmit}>
                <input className='p-3 w-72 outline-none border rounded-lg shadow-sm' type="text" placeholder='Digite o nome de um personagem' id='character_id'/>
                <select name="species" id="species" className="filter">
                    <option value="" default>
                    Species
                    </option>
                    <option value="animal">Animal</option>
                    <option value="alien">Alien</option>
                    <option value="disease">Doença</option>
                    <option value="unknown">Desconhecido</option>
                    <option value="human">Humano</option>
                    <option value="humanoid">Humanoide</option>
                    <option value="mythological">Mitologico</option>
                    <option value="poopybutthole">Poopybutthole</option>
                    <option value="robot">Robo</option>
                </select>
                <select name="gender" id="gender" className="filter">
                    <option value="">
                    Genero
                    </option>
                    <option value="female">Feminino</option>
                    <option value="male">Masculino</option>
                    <option value="genderless">Sem Genero</option>
                    <option value="unknown">Desconhecido</option>
                </select>
                <select name="status" id="status" className="filter">
                    <option value="">
                    Status
                    </option>
                    <option value="alive">Vivo</option>
                    <option value="dead">Morto</option>
                    <option value="unknown">Desconhecido</option>
                </select>
                <button className='bg-violet-500 p-3 rounded-lg text-sky-100 font-bold hover:bg-slate-300 hover:text-slate-500 ease-in-out duration-200' id='btn_search' >Pesquisar</button>
            </form>
        <main className='max-w-[1366px] mt-5 w-full h-screen mx-autor justify-center'>  
            {error && <p className='text-red-600'><strong>{error}</strong></p>}
            {apiData && (
            <div id='content' className='flex flex-wrap gap-4 justify-center relative'> 
                {apiData.map((item, index) => (
                <div 
                    className='py-2 hover:scale-105 transition-all duration-300 cursor-pointer relative' 
                    key={index}
                    onMouseEnter={() => handleHover(item)}
                    onMouseLeave={handlerHoverOut}
                >
                    <img src={item.image} alt="" className='w-100' />
                    {showDetails && currentItem === item && (
                    <div className='text-center absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center px-2 py-4 transition-all duration-700 ease-in-out'>
                        <h2 className='text-2xl text-white'>{item.name}</h2>
                        <p className='text-white'>Origin: {item.origin.name}</p>
                        <p className='text-white'>Status: {item.status}</p>
                        <p className='text-white'>Gender: {item.gender}</p>

                    </div>
                    )}
                </div>
                ))}
            </div>
            )}
            <div className='w-100 text-center'>
                <button onClick={loadMore} id="load-more" className='bg-violet-500 p-3 rounded-lg text-sky-100 font-bold  text-3xl hover:bg-slate-300 hover:text-slate-500 ease-in-out duration-200 my-7 w-80' >
                    Carregar mais
                </button>
            </div>
        </main>
    </div>
    )
}

export default Api
