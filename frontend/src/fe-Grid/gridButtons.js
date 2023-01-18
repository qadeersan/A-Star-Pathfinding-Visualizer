const GridButtons = (props) => {
    const { setEnd, setStart, setBarriers, handleStateChange, setGrid, setCurrentState } = props;


    const handleClear = () => {
        setGrid(Array(100).fill().map(() => Array(100).fill('violet')));
        setStart(null);
        setEnd(null);
        setBarriers([]);
        setCurrentState("barrier");
    }

    return (
        <div>
            <button onClick={() => handleStateChange("barrier")}>Barrier</button>
            <button onClick={() => handleStateChange("start")}>Start Point</button>
            <button onClick={() => handleStateChange("end")}>End Point</button>
            <button onClick={handleClear}>Clear</button>
        </div>
    );
}
export default GridButtons;