import React, { useState } from 'react';
import '../Styles/Explorer.css'
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Header from '../Header/Header';

const Explorer = () => {
  const [results, setResults] = useState([]);
  return (
    <div className='ExplorerClass'>
      <Header/>
        <div className='search-bar-container'>
          <SearchBar setResults={setResults}/>
          <SearchResults results={results}/>
        </div>
    </div>
  )
}

export default Explorer;