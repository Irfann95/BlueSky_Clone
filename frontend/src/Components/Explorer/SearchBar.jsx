import React, { useState } from 'react';
import '../Styles/SearchBar.css'

const SearchBar = ({setResults}) => {
  const [input, setInput] = useState("")
  const rawToken = localStorage.getItem("token");
  const fetchData = (value) => {
    fetch("http://localhost:3000/api/tweets/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${rawToken}`,
      }
    })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      const results = json.filter((tweet) => {
        return value && tweet.user && tweet.description.includes(value)
      });
      setResults(results);
    });
  };
  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  }
  return (
    <div className='input-wrapper'>
      <input 
        placeholder="Recherchez un tweet" 
        value={input} 
        onChange={(e) => handleChange(e.target.value)}
      />       
    </div>
  )
}

export default SearchBar;