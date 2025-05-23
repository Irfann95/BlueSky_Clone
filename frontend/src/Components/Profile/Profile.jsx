import { useEffect, useState } from "react"
import Header from "../Header/Header"
import '../Styles/Profile.css'

const Profile = () => {
    const rawToken = localStorage.getItem("token");
    const [alltweets, setAlltweets] = useState([])
    const url = window.location.pathname;
    const sliceurl = url.split('/profile/')
    const [user, setUser] = useState(null);
    const fetchTweet = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/tweets/user/${sliceurl[1]}`, {
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
        fetch(`http://localhost:3000/api/auth/${sliceurl[1]}`)
        .then((response) => response.json())
        .then((data) => setUser(data))
        .catch((error) => console.error('Erreur lors de la récupération :', error));
      }, [alltweets._id]);
      useEffect(() => {
        fetchTweet();
      }, []);
      function handleClick(id)  {
        localStorage.setItem("tweetID", JSON.stringify(id));
      };    
    return (
        <div className="Profile">
            <Header/>
            <div className="subtweets">
                <h1>{user?.surname}</h1>
        {alltweets.map((item, index) => (
            <a onClick={() => handleClick(item._id)} href={`/status/${item._id}`} className="article" key={index}>
              <h1>{item.user?.surname.replace(/^"|"$/g, "")}</h1>  
              <div className="pp"></div>
              <div className="tweetdescription">
                <p className="description">{item.description.replace(/^"|"$/g, "")}</p>
                <p className="created_at">{item.createdAt}</p>
              </div>
            </a>
        ))}
        </div>
        </div>
    )
}

export default Profile