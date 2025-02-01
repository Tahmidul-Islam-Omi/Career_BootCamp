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

const RegistrationPage = () => {
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
            const response = await fetch('http://3.109.211.104:8001/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        },
        onSuccess: (data) => {
            console.log('Registration successful:', data);
        },
        onError: (error) => {
            console.error('Registration failed:', error);
        }
    });

    const handleChange = (e) => {
        // form data variable working here
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
            profile_picture: formData.profilePicture,
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
                    sx={{ textAlign: 'center', color: 'blue' }}
                >
                    Registration
                </Typography>
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
                    <Box display="flex" justifyContent="center">
                        <Button type="submit" variant="outlined" color="primary">
                            Register
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};

export default RegistrationPage;
