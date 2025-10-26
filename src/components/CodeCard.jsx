import { useDrag, useDrop } from "react-dnd"
import React from "react"

function CodeCard({ card, origin, index, moveCard }) {
  const ref = React.useRef(null)

  const clickSound = React.useMemo(() => new Audio("./assets/sounds/card.mp3"), [])

  const handleClick = () => {
    clickSound.currentTime = 0 // restart sound if clicked repeatedly
    clickSound.play().catch(() => {}) // handle play() promise quietly
  }

  const [, drop] = useDrop({
    accept: "CARD",
    hover(item, monitor) {
        if (!ref.current) return

        const dragIndex = item.index
        const hoverIndex = index

        if (dragIndex === hoverIndex) return

        const hoverBoundingRect = ref.current.getBoundingClientRect();

        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        const BUFFER = 10; //this is a buffer to prevent flickering

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY - BUFFER) return;
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY + BUFFER) return;

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
      onClick={handleClick}
      className="code-card"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <pre className="code-card-content">{card.code}</pre>
    </div>
  )
}

export default CodeCard
