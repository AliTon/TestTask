import React, {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {useDeviceContext} from '../context/DeviceContext';
import {
    Typography,
    Container,
    List,
    ListItem,
    ListItemText,
    Button,
    Box
} from '@mui/material';
import DeviceForm from "./DeviceForm";
import {DeleteOutlined, Devices, Edit, Add} from '@mui/icons-material';


const DeviceList: React.FC = () => {
    const {devices, deleteDevice} = useDeviceContext();
    const navigate = useNavigate()
    let [searchParams] = useSearchParams();
    const [showDialog, setShowDialog] = useState(false)

    useEffect(() => {
        setShowDialog(!!searchParams.get("new") || !!searchParams.get('id'))
    }, [searchParams]);

    const handleRemove = (id: string) => {
        deleteDevice(id);
    };

    const handleAddDevice = () => {
        navigate("?new=true");
    }

    const handleEditDevice = (id) => {
        navigate(`?id=${id}`);
    }


    return (
        <Container style={{padding: '32px', textAlign: 'center'}}>
            <Typography variant="h4" style={{marginBottom: '24px', color: '#2196F3'}}>
                Device List
            </Typography>
            <DeviceForm open={showDialog}/>
            <Button
                onClick={handleAddDevice}
                variant="contained"
                color="primary"
                style={{marginBottom: '24px', background: '#4CAF50', color: '#fff'}}
                startIcon={<Add/>}
            >
                Add New Device
            </Button>
            <List>
                {devices.map((device) => (
                    <ListItem
                        key={device.id}
                        style={{borderBottom: '1px solid #ddd', borderRadius: '8px', marginBottom: '8px'}}
                    >
                        <ListItemText
                            primary={
                                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                                    <Devices color="info"/>
                                    <Typography variant="subtitle1">{device.name}</Typography>
                                </div>}
                        />
                        <Button
                            variant="outlined"
                            color="warning"
                            onClick={() => handleEditDevice(device.id)}
                            sx={{mr: 2}}
                            startIcon={<Edit/>}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={(e) => handleRemove(device.id)}
                            startIcon={<DeleteOutlined/>}
                        >
                            Remove
                        </Button>
                    </ListItem>
                ))}
            </List>
            {devices.length === 0 && (
                <Box mt={4}>
                    <Typography variant="body1" color="textSecondary">
                        No devices found. Add one now!
                    </Typography>
                </Box>
            )}
        </Container>
    );
};

export default DeviceList