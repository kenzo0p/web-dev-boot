import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState()
  const inputRef = useRef("");
  const sendMessage = () => {
    socket.send(inputRef.current?.value)
  }
  useEffect(() => {
    <div>

    </div>
    const ws = new WebSocket("ws://localhost:8080/")
    setSocket(ws);
    ws.onmessage = (e) => {
      alert(e.data);
    }
  } , [])

  return (
   <div>
    <input ref={inputRef} type="text" />
    <button onClick={sendMessage}>Send</button>
   </div>
  )
}

export default App;
//scaling websocets -> video 1 -> 1 : 30 