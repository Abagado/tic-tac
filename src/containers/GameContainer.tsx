import React,{useState} from 'react'
import GameBoard from '../components/GameBoard';
import './GameContainer.css'
import {calculateWinner} from '../helper'


const GameContainer = () => {
    const [board,setBoard]=useState(Array(9).fill(null))
    const [xIsNext, setXIsNext]=useState(true)
    const winner=calculateWinner(board)

    const handleClick=(index:any)=>{
        const boardCopy=[...board]

        if(winner || boardCopy[index] )return 

        boardCopy[index]=xIsNext ? 'X': 'O'

        setBoard(boardCopy)
        setXIsNext(!xIsNext)
    }

    const startNewGame=()=>{
        return(
            <button className='start_btn' onClick={()=>setBoard(Array(9).fill(null))}>Очистить поле</button>
        )
    }

    return (
        <div className='wrapper'>
            <p className='game_info'>
                { winner ? 'Победитель: '+ winner: 'Сейчас ходит: '+ (xIsNext ? 'X':'O')}
            </p>
            <GameBoard cells={board} click={handleClick}/>
            {startNewGame()}
        </div>
    );
}

export default GameContainer
