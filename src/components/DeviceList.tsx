import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useSearchParams} from 'react-router-dom';
import { useDeviceContext } from '../context/DeviceContext';
import {Typography, Container, List, ListItem, ListItemText, Button, Box, Modal} from '@mui/material';
import DeviceForm from "./DeviceForm";

 const DeviceList: React.FC = () => {
    const { devices, deleteDevice } = useDeviceContext();
    const navigate = useNavigate()
    let [searchParams, setSearchParams] = useSearchParams();
    const [showDialog, setShowDialog] = useState(false)

    useEffect(() => {
            setShowDialog(!!searchParams.get("new") || !!searchParams.get('id'))
    }, [searchParams]);

    const handleRemove = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
        e.preventDefault();
        deleteDevice(id);
    };

    const handleAddDevice = () => {
        navigate("?new=true");
    }

    const handleEditDevice = (id) => {
        navigate(`?id=${id}`);
    }


    return (
        <Container style={{ padding: '32px', textAlign: 'center' }}>
            <Typography variant="h4" style={{ marginBottom: '24px', color: '#2196F3' }}>
                Device List
            </Typography>
           <DeviceForm open={showDialog} />
            <Button
                component={Link}
                onClick={handleAddDevice}
                to="/?new=true"
                state={{ videoTitle: "title" }} // <-- state prop
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
                        style={{ borderBottom: '1px solid #ddd', borderRadius: '8px', marginBottom: '8px' }}
                    >
                        <ListItemText
                            primary={<Typography variant="subtitle1">{device.name}</Typography>}
                        />
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={()=> handleEditDevice(device.id)}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
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

 export default DeviceList