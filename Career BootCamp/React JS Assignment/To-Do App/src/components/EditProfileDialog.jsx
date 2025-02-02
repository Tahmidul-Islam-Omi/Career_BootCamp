import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useState } from 'react';

const EditProfileDialog = ({ open, onClose, userInfo, onEdit }) => {
    const [formData, setFormData] = useState(userInfo);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        onEdit(formData);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    sx={{ mb: 2 }}
                />
                <TextField
                    margin="dense"
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    sx={{ mb: 2 }}
                />
                <TextField
                    margin="dense"
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    sx={{ mb: 2 }}
                />
                <TextField
                    margin="dense"
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    sx={{ mb: 2 }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit">Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">Update</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditProfileDialog; 