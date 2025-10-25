import React, { useState, useEffect } from 'react';
import trophyImage from '../assets/cr_trophy.png';
import "../css/sidebar.css";

function Sidebar() {
    const [height, setHeight] = useState(0);
    const [arena, setArena] = useState(1);
    const [locked, setLocked] = useState(false);
    const [trophies, setTrophies] = useState(0)
    const [checkpointTrophies, setCheckpointTrophies] = useState([30, 60, 90, 120]);
    

    useEffect(() => {
            document.documentElement.style.setProperty('--height', `${height}vh`);
        }, [height]);

    const increaseHeight = () => {
        if (locked) return;
        setHeight(prevHeight => {
            const newHeight = prevHeight + 15;
            setTrophies(prevTrophies => prevTrophies + 15)
    
            if (newHeight >= 75) {
                setHeight(75);
                setLocked(true);

                setTimeout(() => {
                setArena(prevArena => prevArena + 0.5);
                setCheckpointTrophies([30, 60, 90, 120].map(val => trophies + val+30));
                setHeight(0);
                setLocked(false);
                }, 1000); 
                return 75; 
            }
            return newHeight;
        });
    };


    return (
        <>
            <div className="sidebar">
            <div class="arena-border">
                <div class="arena-fill">
                    <h1 className='arena'>Arena {arena}</h1>
                </div>
            </div>  
                <div className="rectangle">
                    <div className="bar-progress"/>  
                    {checkpointTrophies.map((trophy, index) => {
                        const percent = (index + 1) * 20;
                        return (
                        <React.Fragment key={index}>
                            <div
                            className="checkpoint"
                            style={{ bottom: `${(percent / 100) * 75}vh` }}
                            />
                            <div
                            className="checkpoint-label"
                            style={{ bottom: `${(percent / 100) * 75}vh` }}
                            >
                            {trophy}
                            </div>
                        </React.Fragment>
                        );
                    })}
                    <div className='trophy-slider'>{trophies}<img className="trophyImage" src={trophyImage} /></div>
                </div>
                <button onClick={increaseHeight}>Increase Height</button>

            </div>
        </>
    );
}

export default Sidebar;
