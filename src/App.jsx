import { useState } from 'react'
import SubmitButton from './components/SubmitButton'
import TopBar from './components/TopBar'
import CodeCard from './components/CodeCard'
import CardMenu from './components/CardMenu'
import CodeArea from './components/CodeArea'
import CodingProblem from './components/CodingProblem'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
function App() {

  const [menuCards, setMenuCards] = useState([
    { id: 1, code: "console.log('Hello World');" },
    { id: 2, code: "function sum(a, b) { return a + b; }" },
    { id: 3, code: "print('HelloWorld')" }
  ])
  const [codeAreaCards, setCodeAreaCards] = useState([])

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
              <CodeArea cards={codeAreaCards} onDropCard={handleDropToCodeArea}/>
              <SubmitButton/>
            </div>
          </div>
        </div>
      </DndProvider>
    </>

  )
}

export default App
