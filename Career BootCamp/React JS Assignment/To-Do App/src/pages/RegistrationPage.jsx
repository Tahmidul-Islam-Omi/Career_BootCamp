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

const RegistrationPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        username: '',
        password: '',
        confirmPassword: '',
        profilePicture: null
    });

    const [error, setError] = useState('');

    const mutation = useMutation({
        mutationFn: async (requestBody) => {
            // Prepare the request body as JSON
            const response = await fetch('http://3.109.211.104:8001/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: requestBody.name,
                    email: requestBody.email,
                    phone: requestBody.phone,
                    username: requestBody.username,
                    password: requestBody.password,
                    // Send profile_picture as a string if needed, or omit it if not required
                    profile_picture: requestBody.profilePicture ? requestBody.profilePicture.name : null
                }),
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed');
            }
            return response.json();
        },
        onSuccess: (data) => {
            console.log('Registration successful:', data);
            navigate('/login'); // Navigate to login page after successful registration
        },
        onError: (error) => {
            console.error('Registration failed:', error);
            setError(error.message || 'Registration failed. Please try again.');
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (name === 'confirmPassword') {
            setError(value !== formData.password ? 'Passwords do not match' : '');
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, profilePicture: file });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const requestBody = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            username: formData.username,
            password: formData.password,
            profilePicture: formData.profilePicture, // Keep the file reference if needed
        };

        mutation.mutate(requestBody);
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 4, marginTop: 5 }}>
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    sx={{ textAlign: 'center', color: 'primary.main' }}
                >
                    Registration
                </Typography>
                {error && (
                    <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
                        {error}
                    </Typography>
                )}
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        margin="normal"
                    />
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
                    <TextField
                        fullWidth
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        margin="normal"
                        error={!!error}
                        helperText={error}
                    />
                    <Box sx={{ mt: 2, mb: 2 }}>
                        <Typography variant="subtitle1" gutterBottom>
                            Profile Picture
                        </Typography>
                        <input
                            id="profile-picture-upload"
                            name="profilePicture"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: 'block' }}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary"
                            sx={{ borderRadius: 2, width: '20%' }}
                        >
                            Register
                        </Button>
                        <Button 
                            type="submit"
                            variant="contained" 
                            color="primary" 
                            onClick={() => navigate('/login')}
                            sx={{ borderRadius: 2, width: '20%' }}
                        >
                            Login
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};

export default RegistrationPage;
