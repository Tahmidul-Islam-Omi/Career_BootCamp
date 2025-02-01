import { TextField } from '@mui/material';

const TaskSearch = ({ searchTerm, setSearchTerm }) => {
    return (
        <TextField
            variant="outlined"
            placeholder="Search by task name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
            sx={{ mb: 3 }}
        />
    );
};

export default TaskSearch; 