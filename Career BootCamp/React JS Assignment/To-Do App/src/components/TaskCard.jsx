import { AccessTime, Edit, Delete, CheckCircle, RadioButtonUnchecked } from '@mui/icons-material';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';

const TaskCard = ({ task, onEdit, onDelete, onToggleComplete }) => {
    return (
        <Card 
            sx={{ 
                borderRadius: 2,
                boxShadow: 3,
                opacity: task.is_completed ? 0.7 : 1,
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
                            onClick={() => onToggleComplete(task)}
                            color={task.is_completed ? 'primary' : 'default'}
                        >
                            {task.is_completed ? <CheckCircle /> : <RadioButtonUnchecked />}
                        </IconButton>
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                textDecoration: task.is_completed ? 'line-through' : 'none'
                            }}
                        >
                            {task.title}
                        </Typography>
                    </Box>
                    <Box>
                        <IconButton onClick={() => onEdit(task)}>
                            <Edit />
                        </IconButton>
                        <IconButton onClick={() => onDelete(task.id)}>
                            <Delete />
                        </IconButton>
                    </Box>
                </Box>

                <Typography 
                    variant="body1" 
                    sx={{ 
                        mb: 2,
                        textDecoration: task.is_completed ? 'line-through' : 'none'
                    }}
                >
                    {task.description}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AccessTime color="action" />
                    <Typography variant="body2" color="text.secondary">
                        {new Date(task.deadline).toLocaleDateString()}
                    </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                    Priority: {task.priority}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default TaskCard;