import {
    Box,
    Button,
    Container,
    Paper,
    TextField,
    Typography
} from '@mui/material';
import { useState } from 'react';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can add your login logic, e.g., API call
        console.log('Login data:', formData);
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
                    <Box display="flex" justifyContent="center">
                        <Button type="submit" variant="outlined" color="primary">
                            Login
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};

export default LoginPage;
