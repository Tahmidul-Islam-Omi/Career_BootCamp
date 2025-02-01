import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';

const TaskSortControls = ({ sortBy, setSortBy, sortOrder, setSortOrder }) => {
    const handleSortByChange = (event, newSortBy) => {
        if (newSortBy !== null) {
            setSortBy(newSortBy);
        }
    };

    const handleSortOrderChange = (event, newSortOrder) => {
        if (newSortOrder !== null) {
            setSortOrder(newSortOrder);
        }
    };

    return (
        <Box 
            sx={{ 
                mb: 3,
                p: 2,
                borderRadius: 2,
                bgcolor: 'background.paper',
                boxShadow: 1,
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                gap: 2
            }}
        >
            <Typography 
                variant="subtitle1" 
                sx={{ 
                    fontWeight: 'medium',
                    color: 'text.secondary'
                }}
            >
                Sort by:
            </Typography>
            
            <ToggleButtonGroup
                value={sortBy}
                exclusive
                onChange={handleSortByChange}
                size="small"
                sx={{ 
                    flexGrow: 1,
                    justifyContent: 'center'
                }}
            >
                <ToggleButton 
                    value="creationTime"
                    sx={{ 
                        px: 2,
                        '&.Mui-selected': {
                            backgroundColor: 'primary.main',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'primary.dark',
                            }
                        }
                    }}
                >
                    Creation Time
                </ToggleButton>
                <ToggleButton 
                    value="deadline"
                    sx={{ 
                        px: 2,
                        '&.Mui-selected': {
                            backgroundColor: 'primary.main',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'primary.dark',
                            }
                        }
                    }}
                >
                    Deadline
                </ToggleButton>
                <ToggleButton 
                    value="priority"
                    sx={{ 
                        px: 2,
                        '&.Mui-selected': {
                            backgroundColor: 'primary.main',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'primary.dark',
                            }
                        }
                    }}
                >
                    Priority
                </ToggleButton>
            </ToggleButtonGroup>

            <ToggleButtonGroup
                value={sortOrder}
                exclusive
                onChange={handleSortOrderChange}
                size="small"
            >
                <ToggleButton 
                    value="asc"
                    sx={{ 
                        '&.Mui-selected': {
                            backgroundColor: 'primary.main',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'primary.dark',
                            }
                        }
                    }}
                >
                    <ArrowUpward />
                </ToggleButton>
                <ToggleButton 
                    value="desc"
                    sx={{ 
                        '&.Mui-selected': {
                            backgroundColor: 'primary.main',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'primary.dark',
                            }
                        }
                    }}
                >
                    <ArrowDownward />
                </ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
};

export default TaskSortControls; 