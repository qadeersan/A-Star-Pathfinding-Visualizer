import React, { useState, useEffect } from 'react';
import GridButtons from './gridButtons';
import './gridInterface.css'

const GridInterface = (props) => {
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const [click, setClick] = useState(1);
    const [barriers, setBarriers] = useState([]);

    const [isMouseDown, setIsMouseDown] = useState(false);
    const [elementWidth, setElementWidth] = useState(3);
    const [grid, setGrid] = useState(Array(100).fill().map(() => Array(100).fill('violet')));

    useEffect(() => {
        const handleResize = () => {
            setElementWidth(Math.floor(window.innerHeight / 100));
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        setTimeout(handleResize, 50);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleMouseDown = (i, j) => {
        setIsMouseDown(true);
        updateGridOnClick(i, j);
    };
    
    const handleMouseUp = () => {
        setIsMouseDown(false);
    }

    const handleMouseMove = (i, j) => {
        if (isMouseDown && click > 3) {
            updateGridOnClick(i, j);
        }
    }
    
    const updateGridOnClick = (i, j) => {
        let newColor;
        switch (click) {
            case 1: 
                setStart([i,j]);
                newColor = "green";
                break;
            case 2:
                setEnd([i,j])
                newColor = "red";
                break;
            default:
                setBarriers([...barriers, [i, j]]);
                newColor = "black";
        }

        const newGrid = [...grid];
        newGrid[i][j] = newColor;
        setGrid(newGrid);
        setClick(click + 1);
    }

    const handleSubmit = async() => {
        const data = {start: start, end: end, barriers: barriers};
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        const response = await fetch('/path/to/your/endpoint', options);
        const json = await response.json();
        console.log(json);
    }

    return (
        <span className='grid-component'>
        <div className="grid-container">
            <GridButtons setStart={setStart} setEnd={setEnd} setBarriers={setBarriers} setClick={setClick} setGrid={setGrid} />
            <table>
                <tbody>
                {grid.map((row, i) => (
                    <tr key={i}>
                        {row.map((col, j) => (
                            <td key={j} 
                            className="grid-element"
                            style={{ 
                                width: elementWidth,
                                height: elementWidth,
                                backgroundColor: grid[i][j] 
                            }} 
                            onMouseDown={() => handleMouseDown(i, j)}
                            onMouseMove={() => handleMouseMove(i, j)}
                            onMouseUp={() => handleMouseUp()}
                            >
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        </span>
    );
}

export default GridInterface;
