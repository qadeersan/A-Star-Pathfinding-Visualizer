import React, { useState, useEffect } from 'react';
import GridButtons from './gridButtons';
import './gridInterface.css'

const GridInterface = (props) => {
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const [click, setClick] = useState(1);

    const [isMouseDown, setIsMouseDown] = useState(false);
    const [barriers, setBarriers] = useState([]);
    const [grid, setGrid] = useState(Array(100).fill().map(() => Array(100).fill('violet')));
    const [elementWidth, setElementWidth] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            setElementWidth(Math.floor(window.innerHeight / 120));
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
    
    const handleMouseUo = () => {
        setIsMouseDown(false);
    }

    const handleMouseMove = (i, j) => {
        if (isMouseDown && click > 2) {
            updateGridOnClick(i, j);
        }
    }
    
    const updateGridOnClick = (i, j) => {
        let newColor;
        switch (click) {
            case 1: 
                setStart([i,j]);
                setClick(click + 1);
                newColor = "green";
                break;
            case 2:
                setEnd([i,j])
                setClick(click + 1);
                newColor = "red";
                break;
            default:
                setBarriers([...barriers, [i, j]]);
                newColor = "black";
        }

        const newGrid = [...grid];
        newGrid[i][j] = newColor;
        setGrid(newGrid);
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
                            onMouseUp={() => handleMouseUo()}
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
