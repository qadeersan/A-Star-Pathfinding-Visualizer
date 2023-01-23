import axios from 'axios';

const GridButtons = (props) => {
    const { start, end, barriers, setEnd, setStart, setBarriers, setGrid, setClick } = props;

    const handleReset = () => {
        setStart(null);
        setEnd(null);
        setBarriers([]);
        setGrid(Array(100).fill().map(() => Array(100).fill('violet')));
        setClick(1);
      }

      const handleSubmit = async () => {
        // Prepare the data to send to the backend
        const data = {
            start: start,
            end: end,
            barriers: barriers
        }
    
        // Send a POST request to the backend
        try {
            const response = await axios.post('/api/pathfinding/', data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }
      
    return (
        <div>
            <button onClick={handleReset}>Reset</button>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}
export default GridButtons;