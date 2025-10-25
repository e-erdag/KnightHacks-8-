import React, { useState, useEffect } from 'react';
import "../css/sidebar.css";

function Sidebar() {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        document.documentElement.style.setProperty('--width', `${width}vw`);
      }, [width]);

    const increaseWidth = () => {
        setWidth(prevWidth => prevWidth + 18);
    };

    return (
        <div className="sidebar">
            <div className="rectangle"><div className="bar-progress"/></div>
            <button onClick={increaseWidth}>Increase Width</button>
        </div>
    );
}

export default Sidebar;