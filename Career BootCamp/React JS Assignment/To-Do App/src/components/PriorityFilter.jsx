import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const PriorityFilter = ({ selectedPriority, setSelectedPriority }) => {
    return (
        <Box sx={{ mb: 3 }}>
            <FormControl fullWidth>
                <InputLabel>Filter by Priority</InputLabel>
                <Select
                    value={selectedPriority}
                    onChange={(e) => setSelectedPriority(e.target.value)}
                    label="Filter by Priority"
                >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                    <MenuItem value="5">5</MenuItem>
                    <MenuItem value="6">6</MenuItem>
                    <MenuItem value="7">7</MenuItem>
                    <MenuItem value="8">8</MenuItem>
                    <MenuItem value="9">9</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default PriorityFilter; 