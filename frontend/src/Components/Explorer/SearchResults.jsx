import React from 'react'
import '../Styles/SearchResults.css'

const SearchResults = ({ results }) => {
return (
    <div className='results'>
    {
        results.map((item, index) => (
            <a href={`/status/${item._id}`} className="article" key={index}>
              <div className="pp"></div>
              <div className="tweetdescription">
                <h1>{item.user.surname.replace(/^"|"$/g, "")}</h1>
                <p className="description">{item.description.replace(/^"|"$/g, "")}</p>
                <p className="created_at">{item.createdAt}</p>
              </div>
            </a>
        ))
    }   
    </div>
  )
}

export default SearchResults; 