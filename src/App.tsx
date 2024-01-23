import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React from 'react'
import './App.css'
import GameContainer from './containers/GameContainer'
import LoginScreen from './containers/screens/LoginScreen'
import HomeScreen from './containers/screens/HomeScreen'

export default function App() {
    
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginScreen/>}/>
          <Route path='home' element={<HomeScreen/>}/>
          <Route path='game/:roomId' element={<GameContainer/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}