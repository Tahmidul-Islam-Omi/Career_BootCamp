import { Box, TextField } from '@mui/material';

const PriorityFilter = ({ selectedPriority, setSelectedPriority }) => {
    return (
        <Box sx={{ mb: 3 }}>
            <TextField
                fullWidth
                label="Filter by Priority"
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                placeholder="Enter priority number to filter"
                type="text"
            />
        </Box>
    );
};

export default PriorityFilter;