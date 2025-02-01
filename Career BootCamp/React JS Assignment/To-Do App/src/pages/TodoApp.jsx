import { useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import { AccessTime, Flag } from '@mui/icons-material';

const TodoApp = () => {
    const [tasks, setTasks] = useState([]);
    const [open, setOpen] = useState(false);
    const [taskData, setTaskData] = useState({
        name: '',
        description: '',
        deadline: '',
        priority: 1,
    });

    const getPriorityColor = (priority) => {
        const num = parseInt(priority);
        if (num >= 7) return 'error';
        if (num >= 4) return 'warning';
        return 'success';
    };

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

            <Stack spacing={2}>
                {tasks.map((task, index) => (
                    <Card 
                        key={index} 
                        sx={{ 
                            borderRadius: 2,
                            boxShadow: 3,
                            '&:hover': {
                                boxShadow: 6,
                                transform: 'scale(1.02)',
                                transition: 'all 0.2s ease-in-out'
                            }
                        }}
                    >
                        <CardContent>
                            <Box sx={{ mb: 2 }}>
                                <Typography 
                                    variant="h6" 
                                    sx={{ 
                                        color: 'primary.main',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    {task.name}
                                </Typography>
                            </Box>

                            <Typography 
                                variant="body1" 
                                sx={{ 
                                    mb: 2,
                                    color: 'text.secondary'
                                }}
                            >
                                {task.description}
                            </Typography>

                            <Stack 
                                direction="row" 
                                spacing={2} 
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Flag color={getPriorityColor(task.priority)} />
                                    <Chip 
                                        label={`Priority ${task.priority}`}
                                        color={getPriorityColor(task.priority)}
                                        size="small"
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <AccessTime color="action" />
                                    <Typography variant="body2" color="text.secondary">
                                        {task.deadline}
                                    </Typography>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                ))}
            </Stack>

            <Dialog 
                open={open} 
                onClose={() => setOpen(false)}
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        p: 1
                    }
                }}
            >
                <DialogTitle sx={{ color: 'primary.main' }}>Add a New Task</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Task Name"
                        name="name"
                        value={taskData.name}
                        onChange={handleChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        name="description"
                        value={taskData.description}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={3}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="dense"
                        label="Deadline"
                        name="deadline"
                        type="date"
                        value={taskData.deadline}
                        onChange={handleChange}
                        fullWidth
                        sx={{ mb: 2 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Priority (1-9)"
                        name="priority"
                        type="number"
                        value={taskData.priority}
                        onChange={handleChange}
                        fullWidth
                        inputProps={{
                            min: 1,
                            max: 9
                        }}
                    />
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button 
                        onClick={() => setOpen(false)} 
                        color="inherit"
                        sx={{ borderRadius: 2 }}
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleSubmit} 
                        variant="contained"
                        sx={{ borderRadius: 2 }}
                    >
                        Add Task
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default TodoApp;
