import React from 'react'
import './App.css'

import { db } from './firebase'

import CreateRoomButton from './components/CreateRoomButton'

function App() {
  console.log(db)

  return (
    <div className="App">
      <CreateRoomButton />
    </div>
  )
}

export default App
