import React, { useState, useEffect } from 'react';
import GridButtons from './gridButtons';
import './gridInterface.css'

const GridInterface = (props) => {
    let start = null;
    let end = null;
    let barriers = [];

    const [grid, setGrid] = useState(Array(100).fill().map(() => Array(100).fill('violet')));
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [elementWidth, setElementWidth] = useState(3);
    const [currentState, setCurrentState] = useState("barrier"); //new state variable to keep track of the current state

    const handleStateChange = (newState) => {
        setCurrentState(newState);
        console.log(newState);
    }

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
        handleClick(i, j);
    };

    const handleMouseUp = () => {
        setIsMouseDown(false);
    };

    const handleClick = (i, j) => {
        if (!isMouseDown) return;
        let newColor;
        switch (currentState) {
            case "barrier":
                newColor = "black";
                barriers.push([i, j]);
                break;
            case "start":
                if (start) {
                    // change the color of the previous start point back to 'violet'
                    const newGrid = [...grid];
                    newGrid[start[0]][start[1]] = 'violet';
                    setGrid(newGrid);
                }
                newColor = "green";
                start = [i, j];
                break;
            case "end":
                if (end) {
                    // change the color of the previous end point back to 'violet'
                    const newGrid = [...grid];
                    newGrid[end[0]][end[1]] = 'violet';
                    setGrid(newGrid);
                }
                newColor = "red";
                end = [i, j];
                break;
            default:
                newColor = "violet";
        }
    
        const newGrid = [...grid];
        newGrid[i][j] = newColor;
        setGrid(newGrid);
    }



    return (
        <span className='grid-component'>
        <div className="grid-container">
            <GridButtons setCurrentState={setCurrentState} setGrid={setGrid} handleStateChange={handleStateChange}/>
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
                            onMouseUp={handleMouseUp}
                            onMouseEnter={() => handleClick(i, j)}
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
