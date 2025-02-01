import { Button, Container, Typography } from '@mui/material';
import { useState } from 'react';
import TaskDialog from '../components/TaskDialog';
import TaskList from '../components/TaskList';
import TaskSortControls from '../components/TaskSortControls';

const TodoApp = () => {
    const [tasks, setTasks] = useState([]);
    const [open, setOpen] = useState(false);
    const [sortBy, setSortBy] = useState('creationTime');
    const [sortOrder, setSortOrder] = useState('desc');
    const [taskData, setTaskData] = useState({
        name: '',
        description: '',
        deadline: '',
        priority: 1,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData({ ...taskData, [name]: value });
    };

    const handleSubmit = () => {
        const newTask = {
            ...taskData,
            creationTime: new Date().toISOString(),
        };
        setTasks([...tasks, newTask]);
        setTaskData({ name: '', description: '', deadline: '', priority: 1 });
        setOpen(false);
    };

    const getSortedTasks = () => {
        return [...tasks].sort((a, b) => {
            let comparison = 0;
            
            switch (sortBy) {
                case 'creationTime':
                    comparison = new Date(a.creationTime) - new Date(b.creationTime);
                    break;
                case 'deadline':
                    comparison = new Date(a.deadline) - new Date(b.deadline);
                    break;
                case 'priority':
                    comparison = parseInt(a.priority) - parseInt(b.priority);
                    break;
                default:
                    comparison = 0;
            }

            return sortOrder === 'asc' ? comparison : -comparison;
        });
    };

    return (
        <Container maxWidth="sm">
            <Typography 
                variant="h4" 
                component="h1" 
                gutterBottom 
                sx={{ 
                    textAlign: "center", 
                    color: 'primary.main',
                    my: 3,
                    fontWeight: 'bold'
                }}
            >
                To-Do List
            </Typography>
            
            <Button 
                variant="contained" 
                color="primary" 
                onClick={() => setOpen(true)}
                sx={{ 
                    display: "block", 
                    mx: "auto",
                    mb: 4,
                    px: 4,
                    py: 1,
                    borderRadius: 2
                }}
            >
                Create Task
            </Button>

            <TaskSortControls 
                sortBy={sortBy}
                setSortBy={setSortBy}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
            />

            <TaskList tasks={getSortedTasks()} />
            
            <TaskDialog 
                open={open}
                onClose={() => setOpen(false)}
                taskData={taskData}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
        </Container>
    );
};

export default TodoApp;
