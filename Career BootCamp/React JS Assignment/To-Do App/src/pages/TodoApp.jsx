import { AccountCircle } from '@mui/icons-material';
import { Box, Button, Container, IconButton, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PriorityFilter from '../components/PriorityFilter';
import Statistics from '../components/Statistics';
import TaskDialog from '../components/TaskDialog';
import TaskList from '../components/TaskList';
import TaskSearch from '../components/TaskSearch';
import TaskSortControls from '../components/TaskSortControls';
import TaskUpdateDialog from '../components/TaskUpdateDialog';

const TodoApp = () => {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [sortBy, setSortBy] = useState('creationTime');
    const [sortOrder, setSortOrder] = useState('desc');
    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        deadline: '',
        priority: 0,
    });
    const [currentTask, setCurrentTask] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPriority, setSelectedPriority] = useState('');
    const navigate = useNavigate();

    // Fetch todos
    const { data: tasks = [], isLoading } = useQuery({
        queryKey: ['todos'],
        queryFn: async () => {
            const token = localStorage.getItem('access_token');
            const response = await fetch('https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev/todos', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch todos');
            }
            return response.json();
        }
    });

    // Create todo mutation
    const createTodoMutation = useMutation({
        mutationFn: async (newTodo) => {
            const token = localStorage.getItem('access_token');
            const response = await fetch('https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev/todo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newTodo)
            });
            if (!response.ok) {
                throw new Error('Failed to create todo');
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['todos']);
            setOpen(false);
            setTaskData({ title: '', description: '', deadline: '', priority: 0 });
        }
    });

    // Update todo mutation
    const updateTodoMutation = useMutation({
        mutationFn: async ({ id, updatedTodo }) => {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev/todo/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedTodo)
            });
            if (!response.ok) {
                throw new Error('Failed to update todo');
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['todos']);
            setOpenUpdate(false);
            setTaskData({ title: '', description: '', deadline: '', priority: 0 });
        }
    });

    // Delete todo mutation
    const deleteTodoMutation = useMutation({
        mutationFn: async (id) => {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev/todo/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to delete todo');
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['todos']);
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData({ ...taskData, [name]: value });
    };

    const handleSubmit = () => {
        const newTodo = {
            title: taskData.title,
            description: taskData.description,
            deadline: taskData.deadline,
            priority: parseInt(taskData.priority)
        };
        createTodoMutation.mutate(newTodo);
    };

    const handleUpdateSubmit = () => {
        const updatedTodo = {
            title: taskData.title,
            description: taskData.description,
            deadline: taskData.deadline,
            priority: parseInt(taskData.priority),
            is_completed: currentTask.is_completed
        };
        updateTodoMutation.mutate({ id: currentTask.id, updatedTodo });
    };

    const handleEdit = (task) => {
        setCurrentTask(task);
        setTaskData({
            title: task.title,
            description: task.description,
            deadline: task.deadline,
            priority: task.priority
        });
        setOpenUpdate(true);
    };

    const handleDelete = (id) => {
        deleteTodoMutation.mutate(id);
    };

    const handleToggleComplete = (task) => {
        const updatedTodo = {
            title: task.title,
            description: task.description,
            deadline: task.deadline,
            priority: task.priority,
            is_completed: !task.is_completed
        };
        updateTodoMutation.mutate({ id: task.id, updatedTodo });
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

    const filteredTasks = getSortedTasks().filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPriority = selectedPriority ? task.priority === parseInt(selectedPriority) : true;
        return matchesSearch && matchesPriority;
    });

    if (isLoading) return <div>Loading...</div>;

    return (
        <Container maxWidth="sm">
            <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
                <IconButton 
                    color="primary" 
                    onClick={() => navigate('/profile')}
                    sx={{ width: 48, height: 48 }}
                >
                    <AccountCircle sx={{ width: 32, height: 32 }} />
                </IconButton>
            </Box>

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
            
            <Statistics tasks={tasks} />

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

            <TaskSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <PriorityFilter selectedPriority={selectedPriority} setSelectedPriority={setSelectedPriority} />

            <TaskSortControls 
                sortBy={sortBy}
                setSortBy={setSortBy}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
            />

            <TaskList 
                tasks={filteredTasks} 
                onEdit={handleEdit} 
                onDelete={handleDelete}
                onToggleComplete={handleToggleComplete}
            />
            
            <TaskDialog 
                open={open}
                onClose={() => setOpen(false)}
                taskData={taskData}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />

            <TaskUpdateDialog 
                open={openUpdate}
                onClose={() => setOpenUpdate(false)}
                taskData={taskData}
                onChange={handleChange}
                onSubmit={handleUpdateSubmit}
            />
        </Container>
    );
};

export default TodoApp;