const GridButtons = (props) => {

    const handleClear = () => {
        props.setGrid(Array(100).fill().map(() => Array(100).fill('violet')));
        props.setCurrentState("barrier");
    }

    return (
        <div>
            <button onClick={() => props.handleStateChange("barrier")}>Barrier</button>
            <button onClick={() => props.handleStateChange("start")}>Start Point</button>
            <button onClick={() => props.handleStateChange("end")}>End Point</button>
            <button onClick={handleClear}>Clear</button>
        </div>
    );
}
export default GridButtons;