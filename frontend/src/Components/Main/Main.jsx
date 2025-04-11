import "../Styles/Main.css";
import React, { useEffect, useState } from "react";
import AllTweets from '../Tweets/AllTweets'

const Main = () => {
  const rawUserId = localStorage.getItem("userID");
  const userId = rawUserId.replace(/^"|"$/g, "");
  const rawToken = localStorage.getItem("token");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [formData, setFormData] = useState({
    user: userId,
    description: "",
  });
  const [error, setError] = useState(null);
  const [valid, setValid] = useState(null);
  // const [joke, setJoke] = useState(null);
  const [datas, setData] = useState([]);
  const validMessageClick = () => {
    setIsAlertVisible(true);

    setTimeout(() => {
      setIsAlertVisible(false);
    }, 3000);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("FormData:", formData);
    try {
      const response = await fetch("http://localhost:3000/api/tweets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${rawToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Post send:", data);
        setValid(data.message || "post sending sucess");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "post sending failed");
        console.error("Error details:", errorData);
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    }
  };
  return (
    <main className="main">
      <div className="submain">
        <div className="fildactualite">
          <p>Votre fil d'actualité</p>
        </div>
        <div className="postdiv">
          <div className="subpostdiv">
            <div className="photodeprofil"></div>
            <form className="PostTweets" onSubmit={handleSubmit}>
              <div className="postinput">
                <textarea
                  maxLength={280}
                  autoComplete="on"
                  value={formData.description}
                  onChange={handleChange}
                  name="description"
                  placeholder="Quoi de neuf"
                  rows="7"
                  type="description"
                />
              </div>
              {isAlertVisible && (
                <div className="valid"> 
                  {valid && <p className="valid-message">{valid}</p>}
                </div>
              )}
              <div className="postbutton">
                <button onClick={validMessageClick} type="submit">
                  Poster
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="lestweets">
              <AllTweets/>
        </div>
      </div>
      {error && <p className="error-message">{error}</p>}
    </main>
  );
};

export default Main;