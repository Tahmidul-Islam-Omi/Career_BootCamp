import {
    Box,
    Button,
    Container,
    Paper,
    TextField,
    Typography
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const mutation = useMutation({
        mutationFn: async (loginData) => {
            const response = await fetch('https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            return response.json();
        },
        onSuccess: (data) => {
            console.log('Login successful, received data:', data); // Debug log
            // Save the access token for future use
            localStorage.setItem('access_token', data.access_token);
            // Save the username from the request body in local storage
            localStorage.setItem('username', formData.username); // Store username from formData
            // Navigate to the To-Do page
            navigate('/todo');
        },
        onError: (error) => {
            console.error('Login failed:', error);
            // Handle error (e.g., show a notification)
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate(formData); // Trigger the login mutation
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 4, marginTop: 5 }}>
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    sx={{ textAlign: 'center', color: 'blue' }}
                >
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        margin="normal"
                    />
                    <Box display="flex" justifyContent="center" sx={{ gap: 2 }}>
                        <Button type="submit" variant="contained" color="primary">
                            Login
                        </Button>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={() => navigate('/register')}
                        >
                            Register
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};

export default LoginPage;
