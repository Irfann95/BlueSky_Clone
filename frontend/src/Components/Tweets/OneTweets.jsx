import Header from "../Header/Header"
import '../Styles/OneTweet.css'

const OneTweet = () => {
    const rawUserId = localStorage.getItem("userID");
    const userId = rawUserId.replace(/^"|"$/g, "");
    return (
        <div className="OneTweet">
            <Header/>
            
        </div>
    )
}

export default OneTweet