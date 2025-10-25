import { useDrop } from "react-dnd"
import CodeCard from "./CodeCard"
function CardMenu({cards, onDropCard}) {
    const[, drop] = useDrop(() => ({
        accept: "CARD",
        drop: item => {
            if(item.origin === "codeArea") onDropCard(item)
        }
    }))

    return (
        <div ref={drop} className="card-menu">
            {cards.map((card) => (
                <CodeCard key={card.id} card={card} origin="menu" />
            ))}

        </div>
    )
}

export default CardMenu