import React from 'react'

export default function Cell({ row, col, selectCell, selected, nextToSelected }) {

    return (
        <div className={`cell ${selected ? 'selected' : nextToSelected ? 'next' : 'cell'}`} onClick={() => selectCell(row, col)}/>
    )
}
