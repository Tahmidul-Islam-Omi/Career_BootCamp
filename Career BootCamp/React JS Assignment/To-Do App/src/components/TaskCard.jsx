import { AccessTime, CheckCircle, Delete, Edit, Flag, RadioButtonUnchecked } from '@mui/icons-material';
import { Box, Card, CardContent, Chip, IconButton, Stack, Typography } from '@mui/material';
import CountdownTimer from './CountdownTimer';

const TaskCard = ({ task, onEdit, onDelete, onToggleComplete }) => {
    const getPriorityColor = (priority) => {
        const num = parseInt(priority);
        if (num >= 7) return 'error';
        if (num >= 4) return 'warning';
        return 'success';
    };

    return (
        <Card 
            sx={{ 
                borderRadius: 2,
                boxShadow: 3,
                opacity: task.completed ? 0.7 : 1,
                '&:hover': {
                    boxShadow: 6,
                    transform: 'scale(1.02)',
                    transition: 'all 0.2s ease-in-out'
                }
            }}
        >
            <CardContent>
                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton 
                            onClick={() => onToggleComplete(task.name)}
                            color={task.completed ? 'primary' : 'default'}
                        >
                            {task.completed ? <CheckCircle /> : <RadioButtonUnchecked />}
                        </IconButton>
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                color: 'primary.main',
                                fontWeight: 'bold',
                                textDecoration: task.completed ? 'line-through' : 'none'
                            }}
                        >
                            {task.name}
                        </Typography>
                    </Box>
                    <Box>
                        <IconButton onClick={() => onEdit(task)}>
                            <Edit color="primary" />
                        </IconButton>
                        <IconButton onClick={() => onDelete(task.name)}>
                            <Delete color="error" />
                        </IconButton>
                    </Box>
                </Box>

                <Typography 
                    variant="body1" 
                    sx={{ 
                        mb: 2,
                        color: 'text.secondary',
                        textDecoration: task.completed ? 'line-through' : 'none'
                    }}
                >
                    {task.description}
                </Typography>

                {!task.completed && <CountdownTimer deadline={task.deadline} />}

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

                {task.completed && (
                    <Chip 
                        label="Completed"
                        color="success"
                        size="small"
                        sx={{ mt: 2 }}
                    />
                )}
            </CardContent>
        </Card>
    );
};

export default TaskCard;
