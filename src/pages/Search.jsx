import React from 'react'
import { useState } from 'react'

const Search = () => {
    const alimentos = [
        'Maçã',
        'Banana',
        'Morango',
        'Abacaxi',
        'Melancia',
        'Uva',
        'Pera',
        'Kiwi',
        'Açaí',
        'Laranja',
        'Limão',
        'Mamão',
        'Melão',
        'Cereja',
      ];
      
      
      const [filterAlimentos, setFilterAlimentos] = useState(alimentos)
      
      const handleSearch = (e) =>{
        const searchTerm = e.target.value.toLowerCase();
        console.log(searchTerm)
    
        if (searchTerm === "") {
          setFilterAlimentos(alimentos);
          return;
        }
      
        const filteredAlimentos = alimentos.filter(
          (item) => item.toLowerCase().startsWith(searchTerm)
        );
        setFilterAlimentos(filteredAlimentos);
      };
    
      return (
        <div className='m-16 flex justify-center items-center '>
            <div className="p-6 app pt-5 border-2 max-w-80">
              <div>
                Search: <input className='border-2' name="query" type="text" onChange={handleSearch} />
              </div>
            <div className="list pt-5 flex flex-col flex-wrap max-h-80 items-center text-left">
                {filterAlimentos &&
                  filterAlimentos.map((item, index) => (
                    <div key={index}>{item}</div> //Display each item
                  ))}
            </div>
            </div>
        </div>
      )
    }

export default Search