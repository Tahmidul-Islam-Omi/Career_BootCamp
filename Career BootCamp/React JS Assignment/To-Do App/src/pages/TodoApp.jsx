import { Button, Container, Typography } from '@mui/material';
import { useState } from 'react';
import TaskDialog from '../components/TaskDialog';
import TaskList from '../components/TaskList';

const TodoApp = () => {
    const [tasks, setTasks] = useState([]);
    const [open, setOpen] = useState(false);
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
        setTasks([...tasks, taskData]);
        setTaskData({ name: '', description: '', deadline: '', priority: 1 });
        setOpen(false);
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

            <TaskList tasks={tasks} />
            
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
