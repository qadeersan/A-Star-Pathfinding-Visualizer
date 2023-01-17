import React, { useState, useEffect } from 'react';
import './astar-grid.css'

const GridInterface = () => {
    const [grid, setGrid] = useState(Array(100).fill().map(() => Array(100).fill('|')));
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [elementSize, setElementSize] = useState(10);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            setElementSize(Math.min(width / 100, height / 100));
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
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
        const newGrid = [...grid];
        newGrid[i][j] = newGrid[i][j] === '|' ? '1' : '|';
        setGrid(newGrid);
    }

    return (
        <div>
            <table>
                <tbody>
                {grid.map((row, i) => (
                    <tr key={i}>
                                                {row.map((col, j) => (
                            <td key={j} 
                                style={{ 
                                    width: elementSize + 'px', 
                                    height: elementSize + 'px', 
                                    backgroundColor: grid[i][j] 
                                }} 
                                onMouseDown={() => handleMouseDown(i, j)}
                                onMouseUp={handleMouseUp}
                                onMouseEnter={() => handleClick(i, j)}
                            >
                                {grid[i][j]}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );

}

export default GridInterface;