import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [messages , setMessages] = useState<string[]>([])
  useEffect(() => {

    const ws = new WebSocket("ws://localhost:8080");
    ws.onmessage = (e) => {
      setMessages(m => [...m , e.data])
    }
    } , [])
  return (
   <div className='h-screen w-screen bg-black '>
    <div className='h-[95vh] bg-red-300'>
      {messages.map((message) => (
        <div className='bg-white text-black rounded p-4 m-8 '>{message}</div>
      ))}
    </div>
      <div className='w-full bg-white flex p-4'>
        <input className='flex-1 text-black bg-white' type="text" />
        <button className='w-full bg-black text-white'>Send</button>
      </div>
   </div>
  )
}

export default App
