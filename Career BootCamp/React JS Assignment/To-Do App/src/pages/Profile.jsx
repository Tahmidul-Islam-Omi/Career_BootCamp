import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import EditProfileDialog from '../components/EditProfileDialog';

const Profile = () => {
    const queryClient = useQueryClient();
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const username = 'Omi'; // You might want to get this from authentication context

    // Fetch user profile
    const { data: userInfo, isLoading } = useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`http://3.109.211.104:8001/profile/${username}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch profile');
            }
            return response.json();
        }
    });

    // Update profile mutation
    const updateProfileMutation = useMutation({
        mutationFn: async (updatedInfo) => {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`http://3.109.211.104:8001/profile/${username}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedInfo)
            });
            if (!response.ok) {
                throw new Error('Failed to update profile');
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['profile']);
            setOpenEditDialog(false);
        }
    });

    const handleEdit = (updatedInfo) => {
        updateProfileMutation.mutate(updatedInfo);
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, mt: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    User Profile
                </Typography>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="h6">Name: {userInfo?.name}</Typography>
                    <Typography variant="h6">Email: {userInfo?.email}</Typography>
                    <Typography variant="h6">Phone: {userInfo?.phone}</Typography>
                    <Typography variant="h6">Username: {userInfo?.username}</Typography>
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
