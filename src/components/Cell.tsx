import React from 'react'
import './Cell.css'

const Cell = (props:any) => {
    return (
        <button className='cell' onClick={props.onClick}>{props.value}</button>
    );
}

export default Cell