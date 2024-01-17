import React from 'react'
import './GameBoard.css'
import Cell from './Cell';

const GameBoard = ({cells,click}:any) => {
    return (
        <div className='board'>
            {
                cells.map((cell:any,i:any)=>(
                    <Cell key={i} value={cell} onClick={()=>click(i)}/>
                ))
            }
        </div>
    );
}

export default GameBoard
