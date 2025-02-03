import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const TaskDialog = ({ open, onClose, taskData, onChange, onSubmit }) => {
    return (
        <Dialog 
            open={open} 
            onClose={onClose}
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    p: 1
                }
            }}
        >
            <DialogTitle sx={{ color: 'primary.main' }}>Add a New Task</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Task Name"
                    name="name"
                    value={taskData.name}
                    onChange={onChange}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <TextField
                    margin="dense"
                    label="Description"
                    name="description"
                    value={taskData.description}
                    onChange={onChange}
                    fullWidth
                    multiline
                    rows={3}
                    sx={{ mb: 2 }}
                />
                <TextField
                    margin="dense"
                    label="Deadline"
                    name="deadline"
                    type="date"
                    value={taskData.deadline}
                    onChange={onChange}
                    fullWidth
                    sx={{ mb: 2 }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    margin="dense"
                    label="Priority"
                    name="priority"
                    type="number"
                    value={taskData.priority}
                    onChange={onChange}
                    fullWidth
                />
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <Button 
                    onClick={onClose} 
                    color="inherit"
                    sx={{ borderRadius: 2 }}
                >
                    Cancel
                </Button>
                <Button 
                    onClick={onSubmit} 
                    variant="contained"
                    sx={{ borderRadius: 2 }}
                >
                    Add Task
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TaskDialog; 