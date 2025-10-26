import { useDrop } from "react-dnd"
import CodeCard from "./CodeCard"
import React, {useRef} from "react"

function CodeArea({ cards, moveCard, onDropCard }) {
    const containerRef = useRef(null)

    const [, drop] = useDrop(() => ({
    accept: "CARD",
    drop: (item, monitor) => {
      if (item.origin === "menu") {
        const clientOffset = monitor.getClientOffset();

        //For ordering the cards in the code area
        let dropIndex = cards.length;

        const children = Array.from(containerRef.current.children);
        for (let i = 0; i < children.length; i++) {
          const rect = children[i].getBoundingClientRect();
          if (clientOffset.y < rect.top + rect.height / 2) {
            dropIndex = i;
            break;
          }
        }
        if(item.origin === "menu") {
          onDropCard(item, dropIndex)
        } else if(item.origin === "codeArea") {
          const fromIndex = item.index
          if (fromIndex !== dropIndex) {
            moveCard(fromIndex, dropIndex)
          }
        }
      }
    }
  }))


  return (
    <div ref={(node) => drop(containerRef.current = node)} className="code-area">      
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
  );
}

export default CodeArea
