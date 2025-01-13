import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Content from './components/Content'

function App() {
  return (
    <div className='md:container my-5 mx-3 md:mx-auto md:w-1/2'>
    <Navbar/>
    <Content/>
    </div>
  )
}

export default App
