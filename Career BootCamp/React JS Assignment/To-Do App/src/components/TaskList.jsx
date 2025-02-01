import { Stack } from '@mui/material';
import TaskCard from './TaskCard';

const TaskList = ({ tasks, onEdit }) => {
    return (
        <Stack spacing={2}>
            {tasks.map((task, index) => (
                <TaskCard key={index} task={task} onEdit={onEdit} />
            ))}
        </Stack>
    );
};

export default TaskList; 