import { useState } from 'react'
import Sidebar from "./components/sidebar"
import SubmitButton from './components/SubmitButton'
import TopBar from './components/TopBar'
import CodeCard from './components/CodeCard'
import CardMenu from './components/CardMenu'
import CodeArea from './components/CodeArea'
import CodingProblem from './components/CodingProblem'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import React from 'react'
function App() {

  const [menuCards, setMenuCards] = useState([
    { id: 1, code: "console.log('Hello World');" },
    { id: 2, code: "function sum(a, b) { return a + b; }" },
    { id: 3, code: "print('HelloWorld')" }
  ])
  const [codeAreaCards, setCodeAreaCards] = useState([])

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

  const handleDropToCodeArea = (card) => {
    setMenuCards((prev) => prev.filter((c) => c.id !== card.id));
    setCodeAreaCards((prev) => [...prev, card]);
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
              <CodingProblem />
              <CodeArea cards={codeAreaCards} moveCard={moveCard} onDropCard={handleDropToCodeArea}/>
            </div>
            <div className="submit-button"><SubmitButton/></div>
          </div>
        </div>
      </DndProvider>
      <Sidebar />
    </>

  )
}

export default App
