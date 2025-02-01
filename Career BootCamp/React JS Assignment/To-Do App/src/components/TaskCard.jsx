import { AccessTime, Flag } from '@mui/icons-material';
import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material';

const TaskCard = ({ task }) => {
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
    );
};

export default TaskCard;
