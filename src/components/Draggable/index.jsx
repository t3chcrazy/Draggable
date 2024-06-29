import { useState } from "react";
import PropTypes from 'prop-types'
import './index.css'

function Draggable({ config, index = 0 }) {
    const node = config[index]
    // const parent = index == 0? document: config[index-1]
    const child = index === config.length-1? null: config[index+1]
    const [isClicked, setIsClicked] = useState(false)

    const setClickedState = state => () => {
        setIsClicked(prev => prev !== state? state: prev)
    }

    const handleMove = e => {
        if (isClicked) {
            e.preventDefault()
            const containerStyle = getComputedStyle(node.current)
            let leftValue = parseInt(containerStyle.left);
            let topValue = parseInt(containerStyle.top);
            node.current.style.left = `${leftValue+e.movementX}px`
            node.current.style.top = `${topValue+e.movementY}px`
        }
    }

    return (
        <div ref={node} className="box">
            <button
                className="header"
                onMouseDown={setClickedState(true)}
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