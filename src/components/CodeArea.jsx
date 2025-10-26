// CodeArea.jsx
import { useDrop } from "react-dnd"
import CodeCard from "./CodeCard"

function CodeArea({ cards, moveCard, onDropCard }) {
  const [, drop] = useDrop(() => ({
    accept: "CARD",
    drop: (item) => {
      if (item.origin === "menu") {
        onDropCard(item)
      }
    }
  }))

  return (
    <div ref={drop} className="code-area">
      {cards.map((card, index) => (
        <CodeCard
          key={card.id}
          index={index}
          card={card}
          origin="codeArea"
          moveCard={moveCard}
        />
      ))}
    </div>
  )
}

export default CodeArea
