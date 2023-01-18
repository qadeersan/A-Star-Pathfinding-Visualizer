import React, { useState, useEffect } from 'react';
import GridButtons from './gridButtons';
import './gridInterface.css'

const GridInterface = (props) => {
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);

    const [barriers, setBarriers] = useState([]);
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
        const newGrid = [...grid];

        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (start !== null && grid[i][j] === "green" && (i !== start[0] || j !== start[1])) {
                    newGrid[i][j] = "violet";
                } else if (end !== null && grid[i][j] === "red" && (i !== end[0] || j !== end[1])) {
                    newGrid[i][j] = "violet";
                } 
            }
        }
        setGrid(newGrid);
    };
    

    const handleClick = (i, j) => {
        if (!isMouseDown) return;
        let newColor;
        switch (currentState) {
            case "barrier":
                newColor = "black";
                setBarriers([...barriers, [i, j]]);
                break;
            case "start":
                newColor = "green";
                setStart([i,j])
                break;
            case "end":
                newColor = "red";
                setEnd([i,j]);
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
            <GridButtons setStart={setStart} setEnd={setEnd} setBarriers={setBarriers} setCurrentState={setCurrentState} setGrid={setGrid} handleStateChange={handleStateChange}/>
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
