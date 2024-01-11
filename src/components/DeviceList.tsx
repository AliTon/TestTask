import React from 'react';
import { Link } from 'react-router-dom';
import { useDeviceContext } from '../context/DeviceContext';
import { Typography, Container, List, ListItem, ListItemText, Button, Box } from '@mui/material';

const DeviceList: React.FC = () => {
    const { devices, deleteDevice } = useDeviceContext();

    const handleRemove = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
        e.preventDefault();
        deleteDevice(id);
    };


    return (
        <Container style={{ padding: '32px', textAlign: 'center' }}>
            <Typography variant="h4" style={{ marginBottom: '24px', color: '#2196F3' }}>
                Device List
            </Typography>
            <Button
                component={Link}
                to="/new"
                variant="contained"
                color="primary"
                style={{ marginBottom: '24px', background: '#4CAF50', color: '#fff' }}
                startIcon={"+"}
            >
                Create New Device
            </Button>
            <List>
                {devices.map((device) => (
                    <ListItem
                        key={device.id}
                        button
                        component={Link}
                        to={`/device/${device.id}`}
                        style={{ borderBottom: '1px solid #ddd', borderRadius: '8px', marginBottom: '8px' }}
                    >
                        <ListItemText
                            primary={<Typography variant="subtitle1">{device.name}</Typography>}
                        />
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={(e) => handleRemove(e, device.id)}
                        >
                            Remove
                        </Button>
                    </ListItem>
                ))}
            </List>
            {devices.length === 0 && (
                <Box mt={4}>
                    <Typography variant="body1" color="textSecondary">
                        No devices found. Create one now!
                    </Typography>
                </Box>
            )}
        </Container>
    );
};

export default DeviceList;
