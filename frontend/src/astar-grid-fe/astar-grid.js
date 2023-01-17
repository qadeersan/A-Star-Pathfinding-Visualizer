import React, { useState, useEffect } from 'react';
import './astar-grid.css'

const GridInterface = () => {
    const [grid, setGrid] = useState(Array(100).fill().map(() => Array(100).fill('violet')));
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [elementWidth, setElementWidth] = useState(3);
    const [currentState, setCurrentState] = useState("barrier"); //new state variable to keep track of the current state

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
                break;
            case "start":
                newColor = "green";
                break;
            case "end":
                newColor = "red";
                break;
            default:
                newColor = "violet";
        }

        let newGrid = [...grid];

        if (currentState === "clear") {
            newGrid = [grid]
            setGrid(newGrid)
        } else {
            newGrid[i][j] = newColor;
            setGrid(newGrid);
        }
    }

    const handleStateChange = (newState) => {
        setCurrentState(newState);
    }

    return (
        <span className='grid-component'>
        <div className="grid-container">
            <button onClick={() => handleStateChange("barrier")}>Barrier</button>
            <button onClick={() => handleStateChange("start")}>Start Point</button>
            <button onClick={() => handleStateChange("end")}>End Point</button>
            <button onClick={() => handleStateChange("clear")}>Clear</button>
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
    