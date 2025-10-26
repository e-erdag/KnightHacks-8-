import React, { useState, useEffect } from 'react';
import blueKing from '../assets/blue-king.png';
import "../css/hint.css";

function Hint({onClose, hint_message}) {
    const [message, setMessage] = useState("We all Love CLASH!")

    return (
        <>
          <div className="container" onClick={onClose}>
            <div className="box">
              <h4 className="message">{hint_message}</h4>
              <img className="blueKingImage" src={blueKing} alt="Blue King" />
            </div>
          </div>
        </>
      );
    }

export default Hint;
