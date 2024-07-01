import { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types'
import './index.css'

function Draggable({ config, index = 0 }) {
    const node = config[index]
    const child = index === config.length-1? null: config[index+1]
    const [isClicked, setIsClicked] = useState(false)
    const dragOffset = useRef()

    useEffect(() => {
        dragOffset.current = {
            left: node.current.offsetLeft,
            top: node.current.offsetTop
        }
    }, [node, config])

    const setClickedState = state => () => {
        setIsClicked(prev => prev !== state? state: prev)
    }

    const handleMove = e => {
        if (isClicked) {
            e.preventDefault()
            const containerStyle = getComputedStyle(node.current)
            let leftValue = parseInt(containerStyle.left);
            let topValue = parseInt(containerStyle.top);
            let offsetX = leftValue+e.movementX
            let offsetY = topValue+e.movementY
            if (leftValue+e.movementX < -dragOffset.current.left) {
                offsetX = -dragOffset.current.left
            }
            if (topValue+e.movementY < -dragOffset.current.top) {
                offsetY = -dragOffset.current.top
            }
            if (leftValue+e.movementX > dragOffset.current.left) {
                offsetX = dragOffset.current.left
            }
            if (topValue+e.movementY > dragOffset.current.top) {
                offsetY = dragOffset.current.top
            }
            node.current.style.left = `${offsetX}px`
            node.current.style.top = `${offsetY}px`
        }
    }

    const handleMouseDown = () => {
        setIsClicked(true)
    }

    return (
        <div ref={node} className="box">
            <button
                className="header"
                onMouseDown={handleMouseDown}
                onMouseUp={setClickedState(false)}
                onMouseLeave={setClickedState(false)}
                onMouseMoveCapture={handleMove}
            >
                Title
            </button>
            {!!child && <Draggable config={config} index={index+1} />}
        </div>
    )

}

Draggable.propTypes = {
    config: PropTypes.arrayOf(PropTypes.node),
    index: PropTypes.number
}

export default Draggable