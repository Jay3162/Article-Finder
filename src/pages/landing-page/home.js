import React, { useState } from "react";
import style from '../landing-page/home.css';
import { FaSearch } from 'react-icons/fa'
export default function Home () {
    const [clicked, setClicked] = useState(false);

    const toggleSearch = (e) => {
        e.preventDefault();
        setClicked(!clicked);
    }
    return (
        <div className="container">
            <h2>Article Finder</h2>
            <div className="search-wrapper">
                {clicked ? <input className="search-bar"></input> : <div></div>}
                <button className="search-btn" onClick={toggleSearch}>
                    <FaSearch/>
                </button>
            </div>
        </div>
    )
}