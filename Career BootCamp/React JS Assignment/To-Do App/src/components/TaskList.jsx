import { Stack } from '@mui/material';
import TaskCard from './TaskCard';

const TaskList = ({ tasks }) => {
    return (
        <Stack spacing={2}>
            {tasks.map((task, index) => (
                <TaskCard key={index} task={task} />
            ))}
        </Stack>
    );
};

export default TaskList; 