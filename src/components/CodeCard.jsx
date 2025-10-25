import { useDrag } from "react-dnd";

function CodeCard({ card, origin }) {
    const [{isDragging}, drag] = useDrag(() => ({
        type: "CARD",
        item: { ...card, origin},
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    return (
        <div 
            ref={drag}
            className="code-card" 
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            <pre className="code-card-content">{card.code}</pre>
        </div>
    )
}

export default CodeCard