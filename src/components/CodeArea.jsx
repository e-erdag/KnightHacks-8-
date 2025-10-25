import { useDrop } from "react-dnd"
import CodeCard from "./CodeCard"
function CodeArea({cards, onDropCard}) {

    const[, drop] = useDrop(() => ({
        accept: "CARD",
        drop: item => {
            if(item.origin === "menu") {
                onDropCard(item)
            }
        }
    }))

    return (
        <div ref={drop} className ="code-area">
            {cards.map((card) => (
                <CodeCard key={card.id} card={card} origin="codeArea" />
            ))}
        </div>
    )
}

export default CodeArea