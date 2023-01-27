import React, { useEffect, useState } from 'react'
import Cell from './Cell';

const baseGrid = new Array(5).fill(new Array(5).fill(0)).map((row, i) => {
    return row.map((cell, j)=> {
        return {
            id: `${i}-${j}`,
            selected: false,
            nextToSelected: false,
        }
    })
})

export default function Grid() {
    
    const [grid, setGrid] = useState(baseGrid);
    const [selected, setSelected] = useState();

    useEffect(() => {

    }, [selected])
        
    function selectCell(row, col) {
        const newGrid = [...baseGrid];
        if (selected) {
            newGrid[selected[0]][selected[1]].selected = false;
            const nextToPrevSelected = getNextCell(selected[0], selected[1]);
            newGrid[nextToPrevSelected[0]][nextToPrevSelected[1]].nextToSelected = false;
        }
        newGrid[row][col].selected = true;
        const nextToSelected = getNextCell(row, col);
        newGrid[nextToSelected[0]][nextToSelected[1]].nextToSelected = true;
        setSelected([row, col]);
        setGrid(newGrid);
    }

    function getNextCell(row, col) {
        // If we're on last cell of row, go to next row
        if (col === grid.length - 1) {
            // If we're on the last cell of grid, go back to first row
            if (row === grid.length - 1) { 
                return [0, 0];
            }
            return [row + 1, 0];
        } else {
            return [row, col + 1];
        }
    }

    return (<>
        {grid.map((row, i) => {
            return <div key={i} className="row">
            {row.map((cell, j) => {
                return (
                    <Cell key={cell.id}
                    row={i}
                    col={j}
                    selected={cell.selected}
                    selectCell={selectCell}
                    nextToSelected={cell.nextToSelected}
                    />
                    )
                })}
                </div>
            })}
            </>
            )
        }
        