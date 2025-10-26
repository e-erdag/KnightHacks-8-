import { useDrag, useDrop } from "react-dnd"
import React from "react"

function CodeCard({ card, origin, index, moveCard }) {
  const ref = React.useRef(null)

  const [, drop] = useDrop({
    accept: "CARD",
    hover(item, monitor) {
        if (!ref.current) return
        const dragIndex = item.index
        const hoverIndex = index

        if (dragIndex === hoverIndex) return

        moveCard(dragIndex, hoverIndex)
        item.index = hoverIndex
    }
  })

  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: { ...card, origin, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  })

  drag(drop(ref))

  return (
    <div
      ref={ref}
      className="code-card"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <pre className="code-card-content">{card.code}</pre>
    </div>
  )
}

export default CodeCard
