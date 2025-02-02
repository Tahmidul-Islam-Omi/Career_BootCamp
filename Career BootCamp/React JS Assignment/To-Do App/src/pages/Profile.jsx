import { Box, Button, Container, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import EditProfileDialog from '../components/EditProfileDialog';

const Profile = () => {
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [userInfo, setUserInfo] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        username: 'johndoe',
    });

    const handleEdit = (updatedInfo) => {
        setUserInfo(updatedInfo);
        setOpenEditDialog(false);
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    User Profile
                </Typography>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="h6">Name: {userInfo.name}</Typography>
                    <Typography variant="h6">Email: {userInfo.email}</Typography>
                    <Typography variant="h6">Phone: {userInfo.phone}</Typography>
                    <Typography variant="h6">Username: {userInfo.username}</Typography>
                </Box>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => setOpenEditDialog(true)}
                    fullWidth
                    sx={{ borderRadius: 2 }}
                >
                    Edit Profile
                </Button>
            </Paper>

            <EditProfileDialog 
                open={openEditDialog}
                onClose={() => setOpenEditDialog(false)}
                userInfo={userInfo}
                onEdit={handleEdit}
            />
        </Container>
    );
};

export default Profile;
