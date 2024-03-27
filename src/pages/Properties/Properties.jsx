import React from 'react'
import SearchBar from '../../components/SearchBar/SearchBar'

const Properties = () => {

  const {data, isError, isLoading} = useProperties();

  return (
    <div className='wrapper'>
      <div className='flexColContainer paddings innerWidth properties-container '>
        <SearchBar/>
      </div>
    
    </div>
  )
}

export default Properties