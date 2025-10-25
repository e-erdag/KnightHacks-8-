import React, { useState, useEffect } from 'react';
import "../css/sidebar.css";

function Sidebar() {
    const [height, setHeight] = useState(0);
    const [arena, setArena] = useState(1);
    const [locked, setLocked] = useState(false);
    const [trophies, setTrophies] = useState(0)
    
    const checkpoints = [
        { percent: 20, trophy: 30 },
        { percent: 40, trophy: 60 },
        { percent: 60, trophy: 90 },
        { percent: 80, trophy: 120 }
      ];
    

    useEffect(() => {
            document.documentElement.style.setProperty('--height', `${height}vh`);
        }, [height]);

    const increaseHeight = () => {
        if (locked) return;
        setHeight(prevHeight => {
            const newHeight = prevHeight + 16;
            setTrophies(prevTrophies => prevTrophies + 15)
    
            if (newHeight >= 80) {
                setHeight(80);
                setLocked(true);
                setTimeout(() => {
                setArena(prevArena => prevArena + 0.5);
                setHeight(0);
                setLocked(false);
                }, 1000); 
                return 80; 
            }
            return newHeight;
        });
    };


    return (
        <>
                <h1 className='arena'>Arena {arena}</h1>
            <div className="sidebar">
                <div className="rectangle">
                    <div className="bar-progress"/>  
                    {checkpoints.map((cp, index) => (
                        <React.Fragment key={index}>
                        <div
                            className="checkpoint"
                            style={{ bottom: `${(cp.percent / 100) * 80}vh` }}
                        />
                        <div
                            className="checkpoint-label"
                            style={{ bottom: `${(cp.percent / 100) * 80 -1}vh` }}
                        >
                            {cp.trophy}
                        </div>
                        </React.Fragment>
                    ))}
                </div>
                <button onClick={increaseHeight}>Increase Height</button>

            </div>
            <h4>Trophies: {trophies}</h4>
        </>
    );
}

export default Sidebar;
