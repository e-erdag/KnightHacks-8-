import React, { useState, useEffect } from 'react';
import blueKing from '../assets/blue-king.png';
import "../css/hint.css";

function Hint() {
    const [message, setMessage] = useState("We all Love CLASH!")

    return (
        <>
            <div className="container">
                <div className="box">
                    <h4 className='message'>{message}</h4>
                    <img className="blueKingImage" src={blueKing} alt="Blue King" />
                </div>
            </div>
        </>
    );
}

export default Hint;
