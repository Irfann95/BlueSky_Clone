import { useEffect, useState } from "react"
import Header from "../Header/Header"
import '../Styles/Explorer.css'

const Explorer = () => {
    <Header/>
    return (
        <div className="search-top">
                <div className="search">
                    <input type="text" placeholder="Recherchez ici" />
                </div>
        </div>
    )
}

export default Explorer