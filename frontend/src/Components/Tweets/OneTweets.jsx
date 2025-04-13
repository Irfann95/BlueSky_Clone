import Header from "../Header/Header"
import '../Styles/OneTweet.css'
import { useEffect, useState } from "react"

const OneTweet = () => {
    const rawToken = localStorage.getItem("token");
    const [onetweet, setOnetweet] = useState([])
    const url = window.location.pathname;
    const sliceurl = url.split('/status/')
    const fetchTweet = async () => {
            try {
              const response = await fetch(`http://localhost:3000/api/tweets/${sliceurl[1]}`, {
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
              setOnetweet(result);
            } catch (error) {
              console.error('Erreur:', error);
            }
          };
          function stringify(id) {
            JSON.stringify(id)
          }
          useEffect(() => {
            
            fetchTweet();
          }, []);
          return (
            <div className="OneTweet">
                <Header/>
                <div className="subtweets">
                <div className="article">
                  <div className="pp"></div>
                  <div className="tweetdescription">
                  <h1><a href={`/profile/${onetweet.user?._id}`}>{onetweet.user?.surname}</a></h1>
                    <p className="description">{onetweet.description}</p>
                    <p className="created_at">{onetweet.createdAt}</p>
                  </div>
                </div>
            </div>
            </div>
        )
}; 
    

export default OneTweet