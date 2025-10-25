import React, { useState, useEffect } from 'react';
import "../css/sidebar.css";

function Sidebar() {
    const [height, setHeight] = useState(0);
    const [arena, setArena] = useState(1);

    useEffect(() => {
        document.documentElement.style.setProperty('--height', `${height}vh`);
      }, [height]);

      const increaseHeight = () => {
        setHeight(prevHeight => {
          const newHeight = prevHeight + 18;
      
          if (newHeight >= 90) {
            setHeight(90);
            setTimeout(() => {
              setArena(prevArena => prevArena + 0.5);
              setHeight(0);
            }, 1000); 
            return 90; 
          }
          return newHeight;
        });
      };
      

    return (
        <div className="sidebar">
            <h1 className='arena'>Arena {arena}</h1>
            <div className="rectangle"><div className="bar-progress"/></div>
            <button onClick={increaseHeight}>Increase Height</button>

        </div>
    );
}

export default Sidebar;
