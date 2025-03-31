import '../Styles/Navigation.css'
import {ReactComponent as BlueBirdTwisted} from '../../public/blue_bird_twist.svg'

const Navigation = () => {
    return (
        <header>
            <div className="classheader">
                <div className="subclassheader">
                    <div className='NavAndLogo'>
                        <div className='logo2'>
                            <h1><BlueBirdTwisted  className="BlueBirdTwisted2"/></h1>
                        </div>
                        <div className='navigation'>
                            <nav className='navdiv'>
                                <a href='/home'></a>
                                <a href='/explorer'></a>
                                <a href='/profile'></a>
                            </nav>
                        </div>
                    </div>
                    <div className='logout'></div>
                </div>
            </div>
        </header>
    )
        
}

export default Navigation;