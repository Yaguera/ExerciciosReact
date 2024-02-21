import React from 'react'
import { useState } from 'react'
import JSONDATA from '../../MOCK_DATA.json'

const Search = () => {
    const data = JSONDATA
      
      
      const [filterData, setFilterData] = useState(data)
      
      const handleSearch = (e) =>{
        const searchTerm = e.target.value.toLowerCase();
        console.log(searchTerm)
    
        if (searchTerm === "") {
          setFilterData(data);
          return;
        }
        
      
        const filteredData = data.filter(
          (item) => {
            let nomeCompleto = item.first_name.toLowerCase() + " " + item.last_name.toLowerCase();
            return nomeCompleto.startsWith(searchTerm) || item.last_name.toLowerCase().startsWith(searchTerm)  ;
          }
        );
        setFilterData(filteredData);
      };
    
      return (
        <div className='m-16 flex justify-center items-center z-10 '>
            <div className="p-6 app pt-5 border-2 max-w-80">
              <div>
                Search: <input className='border-2' name="query" type="text" onChange={handleSearch} />
              </div>
            <div className="list pt-5 flex flex-col flex-wrap gap-3 max-h-80 items-center text-left overflow-x-auto">
                {filterData &&
                  filterData.map((item, index) => (
                    <div key={index}>{item.first_name} {item.last_name}</div> //Display each item
                  ))}
            </div>
            </div>
        </div>
      )
    }

export default Search;