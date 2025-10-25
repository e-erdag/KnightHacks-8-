import { useState } from 'react'
import SubmitButton from './components/SubmitButton'
import TopBar from './components/TopBar'
import CodeCard from './components/CodeCard'
import CardMenu from './components/CardMenu'
import CodeArea from './components/CodeArea'
function App() {

  return (
    <>
      <div className='background'></div>

      <TopBar />
      <div className="app-container">
          <CardMenu>
            <CodeCard />
            <CodeCard />
            <CodeCard />
            <CodeCard />
          </CardMenu>
      </div>
      <div className="main-content">
          <div>
            <SubmitButton />
            <CodeArea />
          </div>
      </div>
    </>

  )
}

export default App
