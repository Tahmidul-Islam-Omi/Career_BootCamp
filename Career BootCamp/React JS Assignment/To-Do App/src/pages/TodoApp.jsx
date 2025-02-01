import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemText,
    TextField,
    Typography
} from '@mui/material';
import { useState } from 'react';

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
            <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: "center" }}>
                To-Do List
            </Typography>
            <List>
                {tasks.map((task, index) => (
                    <ListItem key={index}>
                        <ListItemText
                            primary={task.name}
                            secondary={`Description: ${task.description}, Deadline: ${task.deadline}, Priority: ${task.priority}`}
                        />
                    </ListItem>
                ))}
            </List>

            <Button variant="contained" color="primary" onClick={() => setOpen(true)} sx={{ display: "block", mx: "auto" }}>
                Create Task
            </Button>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add a New Task</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Task Name"
                        name="name"
                        value={taskData.name}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        name="description"
                        value={taskData.description}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Deadline"
                        name="deadline"
                        type="date"
                        value={taskData.deadline}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Priority (Integer)"
                        name="priority"
                        type="number"
                        value={taskData.priority}
                        onChange={handleChange}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Add Task
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default TodoApp;
