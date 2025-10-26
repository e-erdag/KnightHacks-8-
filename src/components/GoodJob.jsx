import React, { useState, useEffect } from 'react';
import blueKing from '../assets/blue-king.png';
import "../css/hint.css";

function GoodJob({onClose}) {
    const [message, setMessage] = useState("GOOD JOB")
    
        return (
            <>
              <div className="container" onClick={onClose}>
                <div className="box">
                  <h4 className="message">{message}</h4>
                  <img className="blueKingImage" src={blueKing} alt="Blue King" />
                </div>
              </div>
            </>
          );
    }
export default GoodJob