import { useState, useEffect, useRef } from 'react'
import Sidebar from "./components/sidebar"
import SubmitButton from './components/SubmitButton'
import TopBar from './components/TopBar'
import CodeCard from './components/CodeCard'
import CardMenu from './components/CardMenu'
import CodeArea from './components/CodeArea'
import CodingProblem from './components/CodingProblem'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import {getQuestionFromResponse} from './api/supportFunctions.js'
import React from 'react'
function App() {

  const [questionData, setQuestionData] = useState(null);
  const [menuCards, setMenuCards] = useState([])
  const [error, setError] = useState(null);
  const [codeAreaCards, setCodeAreaCards] = useState([])
  const [sidebarRefresh, setSidebarRefresh] = useState(0);


  const didFetchRef = useRef(false);
  const callAPI = async() => {

    try {
      
      const response = await fetch("http://localhost:3000/gen_question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to fetch question.");

      const jsonData = await response.json();
      const data = getQuestionFromResponse(jsonData.response);
    

      setQuestionData(data); 
      setMenuCards(data.card_array);
      setCodeAreaCards([]);  

    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
    }
  };
  

  useEffect(() => {
    if (didFetchRef.current) return; // skip second call
    didFetchRef.current = true;

    callAPI();
  }, []);

  
  

  const codeAreaCardsRef = React.useRef(codeAreaCards);
    React.useEffect(() => {
    codeAreaCardsRef.current = codeAreaCards;
  }, [codeAreaCards]);

  const moveCard = (fromIndex, toIndex) => {
    const updated = [...codeAreaCardsRef.current]
    const [moved] = updated.splice(fromIndex, 1)
    updated.splice(toIndex, 0, moved)
    setCodeAreaCards(updated)
  }

  const handleDropToCodeArea = (card, dropIndex) => {
    setMenuCards((prev) => prev.filter((c) => c.id !== card.id));

    setCodeAreaCards((prev) => {
      const updated = [...prev];
      updated.splice(dropIndex, 0, card); // insert at drop index
      return updated;
    });
  }

  const handleDropToMenu = (card) => {
    // move card from code area back to menu
    setCodeAreaCards((prev) => prev.filter((c) => c.id !== card.id));
    setMenuCards((prev) => [...prev, card]);
  };

  //TODO call api to get code card content then add it to the code card content array

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className='background'></div>
        <TopBar />
        <div className="app-container">
            <CardMenu cards={menuCards} onDropCard={handleDropToMenu}> </CardMenu>
            <div className="main-content">
            <div>
              <CodingProblem question={questionData}/>
              <CodeArea cards={codeAreaCards} moveCard={moveCard} onDropCard={handleDropToCodeArea}/>
            </div>
            <div className="submit-button">
              {questionData && ( 
                <SubmitButton
                  codeAreaCards={codeAreaCards} 
                  correctOrder={questionData.correct_order} 
                  onNextQuestion={callAPI} 
                  refreshSidebar={() => setSidebarRefresh(prev => prev + 1)}
                />
              )}
            </div>
          </div>
        </div>
      </DndProvider>
      <Sidebar key={sidebarRefresh}/>
    </>

  )
}

export default App
