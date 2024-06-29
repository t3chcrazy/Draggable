import { createRef, useState } from 'react'
import './App.css'
import Draggable from './components/Draggable'
import AddButton from './components/AddButton'

function App() {
  const [windows, setWindows] = useState([createRef()])

  const handleAdd = () => setWindows(prev => [createRef(), ...prev])

  return (
    <>
      <Draggable config={windows} />
      <AddButton onClick={handleAdd} />
    </>
  )
}

export default App
