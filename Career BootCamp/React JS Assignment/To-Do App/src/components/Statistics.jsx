import { Box, Card, CardContent, Typography } from '@mui/material';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';

const Statistics = ({ tasks }) => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const efficiency = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    const pieData = [
        { name: 'Completed', value: completedTasks },
        { name: 'Remaining', value: totalTasks - completedTasks }
    ];

    const COLORS = ['#4caf50', '#f44336']; // Green for completed, Red for remaining

    return (
        <Box sx={{ mt: 4, mb: 4 }}>
            <Typography 
                variant="h5" 
                component="h2" 
                gutterBottom 
                sx={{ 
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: 'primary.main'
                }}
            >
                Task Statistics
            </Typography>
            
            <Box 
                display="flex" 
                flexDirection={{ xs: 'column', md: 'row' }} 
                justifyContent="space-between" 
                gap={2}
            >
                <Card 
                    sx={{ 
                        flex: 1,
                        backgroundColor: 'primary.light',
                        color: 'white'
                    }}
                >
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Total Tasks
                        </Typography>
                        <Typography variant="h3">
                            {totalTasks}
                        </Typography>
                    </CardContent>
                </Card>

                <Card 
                    sx={{ 
                        flex: 1,
                        backgroundColor: 'success.light',
                        color: 'white'
                    }}
                >
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Completed Tasks
                        </Typography>
                        <Typography variant="h3">
                            {completedTasks}
                        </Typography>
                    </CardContent>
                </Card>

                <Card 
                    sx={{ 
                        flex: 1,
                        backgroundColor: 'info.light',
                        color: 'white'
                    }}
                >
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Efficiency
                        </Typography>
                        <Typography variant="h3">
                            {efficiency}%
                        </Typography>
                    </CardContent>
                </Card>
            </Box>

            <Card sx={{ mt: 3, p: 2 }}>
                <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell 
                                        key={`cell-${index}`} 
                                        fill={COLORS[index]} 
                                    />
                                ))}
                            </Pie>
                            <Legend 
                                verticalAlign="bottom" 
                                height={36}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </Box>
            </Card>
        </Box>
    );
};

export default Statistics; 