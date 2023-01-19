const GridButtons = (props) => {
    const { setEnd, setStart, setBarriers, setGrid, setClick } = props;


    const handleReset = () => {
        setStart(null);
        setEnd(null);
        setBarriers([]);
        setGrid(Array(100).fill().map(() => Array(100).fill('violet')));
        setClick(1);
      }
      

    return (
        <div>
            <button onClick={handleReset}>Reset</button>
        </div>
    );
}
export default GridButtons;