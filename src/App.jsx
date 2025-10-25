import { useState } from 'react'
import SubmitButton from './components/SubmitButton'
import TopBar from './components/TopBar'
import CodeCard from './components/CodeCard'
import CardMenu from './components/CardMenu'
import CodeArea from './components/CodeArea'
import CodingProblem from './components/CodingProblem'
function App() {

  const [codeCardContent, setCodeCardContent] = useState([]);
  const [loading, setLoading] = useState(false);
  //TODO call api to get code card content then add it to the code card content array

  return (
    <>
      <div className='background'></div>

      <TopBar />
      <div className="app-container">
          <CardMenu>
            {codeCardContent.map((content, index) => (
              <CodeCard key={index} code={content}/>
              
            ))}
            <CodeCard />

          </CardMenu>
      </div>
      <div className="main-content">
          <div>
            <SubmitButton />
            <CodingProblem />
            <CodeArea />
          </div>
      </div>
    </>

  )
}

export default App
