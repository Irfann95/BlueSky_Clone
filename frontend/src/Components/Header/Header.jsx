import '../Styles/Header.css'
import { useAuth } from '../../Provider/authProvider';
import { useNavigate } from 'react-router-dom';
import {ReactComponent as BlueBirdTwisted} from '../../public/blue_bird_twist.svg'
import React, { useEffect, useState } from 'react'; 
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';

const Header = () => {
    const [modal, setModal] = useState(false)
            const toggleModal = () => {
                setModal(!modal)
              }
    const navigate = useNavigate();
    const handleLogout = () => {
            // setToken();
            navigate("/logout");
            };
    const { setToken } = useAuth();
    const [user, setUser] = useState(null);
    const rawUserId = localStorage.getItem("userID");
    const userId = rawUserId.replace(/^"|"$/g, '');
    useEffect(() => {
        fetch(`http://localhost:3000/api/auth/${userId}`)
        .then((response) => response.json())
        .then((data) => setUser(data))
        .catch((error) => console.error('Erreur lors de la récupération :', error));
      }, [userId]);
    
      if (!user) return <p>Chargement...</p>;
    return (
        <header className='header'>
            <div className="classheader">
                <div className="subclassheader">
                    <div className='NavAndLogo'>
                        <div className='logo2'>
                            <h1><BlueBirdTwisted className="BlueBirdTwisted2"/> <p>BlueBird</p></h1>
                        </div>
                        <div className='navigation'>
                            <nav className='navdiv'>
                                <a href='/home'><div><div className='HomeIcon'><HomeIcon style={{fontSize: "60px"}}/></div><div className='text'>Accueil</div></div></a>
                                <a href='/explorer'><div><div className='SearchIcon'><SearchIcon style={{fontSize: "60px"}} /></div><div className='text'>Profil</div></div></a>
                                <a href='/profil'><div><div className='PersonIcon'><PersonIcon style={{fontSize: "60px"}} /></div><div className='text'>Explorer</div></div></a> 
                                <button className='logout' onClick={handleLogout}><div><div className='LogoutIcon'><LogoutIcon style={{fontSize: "60px"}} /></div><div className='text'>Logout</div></div></button> 
                            </nav>
                        </div>
                        <div className='profile'>
                            <div>
                                <button className='profile2'>
                                    <div>Quoi de neuf {user.firstname} ?</div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
        
}

export default Header;