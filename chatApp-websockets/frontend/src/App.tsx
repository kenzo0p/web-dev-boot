import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [messages, setMessages] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const wsRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080/")
    ws.onmessage = (e) => {
      setMessages((m) => [...m, e.data])
    }
    wsRef.current = ws

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "join", payload: { roomId: "red" } }))
    }

    return () => {
      ws.close()
    }
  }, [])

  return (
    <div className='h-screen w-screen bg-black'>
      <div className='h-[95vh] bg-red-300 overflow-y-auto'>
        {messages.map((message, index) => (
          <div key={index} className='bg-white text-black rounded p-4 m-8'>
            {message}
          </div>
        ))}
      </div>
      <div className='w-full bg-white flex p-4'>
        <input
          ref={inputRef}
          className='flex-1 text-black bg-white'
          type='text'
        />
        <button
          onClick={() => {
            if (!inputRef.current?.value) return
            wsRef.current?.send(
              JSON.stringify({
                type: "chat",
                payload: {
                  message: inputRef.current.value
                }
              })
            )
            inputRef.current.value = ''
          }}
          className='w-full bg-black text-white'
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default App
