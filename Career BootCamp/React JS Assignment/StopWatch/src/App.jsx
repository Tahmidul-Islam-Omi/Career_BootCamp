import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import {
  Box,
  Button,
  Container,
  Paper,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';

function App() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let intervalId;
        if (isRunning) {
            intervalId = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
        }
        return () => clearInterval(intervalId);
    }, [isRunning]);

    const handleStart = () => {
        setIsRunning(true);
    };

    const handlePause = () => {
        setIsRunning(false);
    };

    const handleStop = () => {
        setIsRunning(false);
        setTime(0);
    };

    // Format time to display in HH:MM:SS:MS format
    const formatTime = () => {
        const hours = Math.floor(time / 3600000);
        const minutes = Math.floor((time % 3600000) / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const milliseconds = Math.floor((time % 1000) / 10);

        return `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds
            .toString()
            .padStart(2, '0')}`;
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 3
                }}
            >
                <Paper 
                    elevation={3}
                    sx={{
                        padding: 4,
                        borderRadius: 2,
                        textAlign: 'center',
                        width: '100%'
                    }}
                >
                    <Typography 
                        variant="h2" 
                        component="div"
                        sx={{ 
                            fontFamily: 'Roboto',
                            marginBottom: 3
                        }}
                    >
                        {formatTime()}
                    </Typography>

                    <Box sx={{ 
                        display: 'flex', 
                        gap: 2,
                        justifyContent: 'center'
                    }}>
                        {!isRunning ? (
                            <Button
                                variant="contained"
                                color="success"
                                startIcon={<PlayArrowIcon />}
                                onClick={handleStart}
                            >
                                Start
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<PauseIcon />}
                                onClick={handlePause}
                            >
                                Pause
                            </Button>
                        )}
                        <Button
                            variant="contained"
                            color="error"
                            startIcon={<StopIcon />}
                            onClick={handleStop}
                        >
                            Stop
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}

export default App;
