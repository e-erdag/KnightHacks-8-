import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import trophyImage from '../assets/cr_trophy.png';
import "../css/sidebar.css";

const Sidebar = forwardRef((props, ref) => {
  const [arena, setArena] = useState(1);
  const [locked, setLocked] = useState(false);
  const [trophies, setTrophies] = useState(0);
  const [height, setHeight] = useState(0);
  const [checkpointTrophies, setCheckpointTrophies] = useState([30, 60, 90, 120]);

  // Fetch trophies from backend
  
    const getTrophies = async () => {
      try {
        const response = await fetch("http://localhost:3000/read_trophies", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });

        const data = await response.json();
        if (data.response !== undefined) {
          console.log("Trophie Amount:", data.response);
          setTrophies(Number(data.response));
        } else if (data.error) {
          console.error("API error:", data.error);
        }
      } catch (error) {
        console.error("Error fetching trophies:", error);
      }
    }

  useEffect(() => {
    getTrophies();
  }, []);

  useImperativeHandle(ref, () => ({
    refreshTrophies: getTrophies
  }));

  // Whenever trophies change, update the visual height
  useEffect(() => {
    setHeight(Math.min((trophies - (arena-1) * 150) / 2, 75)); // Cap height at 75vh
  }, [trophies]);

  // Apply height to CSS variable
  useEffect(() => {
    document.documentElement.style.setProperty('--height', `${height}vh`);
  }, [height]);

  // Function to simulate earning trophies
  const increaseHeight = () => {
    if (locked) return;

    setTrophies(prev => {
      const newTrophies = prev + 30;

      if ((newTrophies - (arena-1) * 150) / 2 >= 75) {
        // Hit max height: trigger arena transition
        setLocked(true);
        setTimeout(() => {
          setArena(prevArena => prevArena + 0.5);
          setCheckpointTrophies([30, 60, 90, 120].map(val => newTrophies + val));
          setHeight(0);
          setLocked(false);
        }, 1000);
      }

      return newTrophies;
    });
  };

  const changeArena = () => {
    if (locked) return;

    // Check if the current trophies require arena transition
    if ((trophies - (arena - 1) * 150) / 2 >= 75) {
      setLocked(true);
      setTimeout(() => {
        setArena(prevArena => prevArena + 1);
        setCheckpointTrophies([30, 60, 90, 120].map(val => trophies + val));
        setHeight(0);
        setLocked(false);
      }, 1000);
    }
  };

  // Run changeArena whenever trophies change
  useEffect(() => {
    changeArena();
  }, [trophies]); // dependency array ensures it runs only when trophies update


  return (
    <>
      <div className="sidebar">
        <div className="arena-border">
          <div className="arena-fill">
            <h1 className="arena">Arena {arena}</h1>
          </div>
        </div>

        <div className="rectangle">
          <div className="bar-progress" />
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
          <div className="trophy-slider">
            {trophies}
            <img className="trophyImage" src={trophyImage} alt="trophy" />
          </div>
        </div>

        <button onClick={increaseHeight}>Increase Height</button>
      </div>
    </>
  );
});

export default Sidebar;
