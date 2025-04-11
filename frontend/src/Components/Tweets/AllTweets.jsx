import { useEffect, useState } from "react"
import '../Styles/AllTweets.css'
const AllTweets = () => { 
    const rawUserId = localStorage.getItem("userID");
    const userId = rawUserId.replace(/^"|"$/g, "");
    const rawToken = localStorage.getItem("token");
    const [alltweets, setAlltweets] = useState([])
    const fetchTweet = async () => {
        try {
          const response = await fetch("http://localhost:3000/api/tweets", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${rawToken}`,
            }
          });
          if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
          }
          const result = await response.json();
          setAlltweets(result);
        } catch (error) {
          console.error('Erreur:', error);
        }
      };
      useEffect(() => {
        fetchTweet();
      }, []);
      function handleClick(id)  {
        localStorage.setItem("tweetID", JSON.stringify(id));
        console.log("Tu as cliqué sur :", id);
      }; 
    return (
        <div className="subtweets">
        {alltweets.map((item, index) => (
            <a onClick={() => handleClick(item._id)} href={`/status/${item._id}`} className="article" key={index}>
              <div className="pp"></div>
              <div className="tweetdescription">
                <h1>{item.user.surname.replace(/^"|"$/g, "")}</h1>
                <p className="description">{item.description.replace(/^"|"$/g, "")}</p>
                <p className="created_at">{item.createdAt}</p>
              </div>
            </a>
        ))}
        </div>          
    )
}

export default AllTweets;