import React from 'react';
import {useSearchParams} from 'react-router-dom';
import {useDeviceContext} from '../context/DeviceContext';
import {
    Button,
    TextField,
    Container,
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import {v4 as uuidv4} from 'uuid';


export default function DeviceForm({open}: { open: boolean }) {

    let [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get("id")

    const {devices, addDevice, editDevice} = useDeviceContext();

    const device = devices.find((d) => d.id === id);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());
        const name = formJson.name;
        const serialNumber = formJson.serialNumber;
        const data = formJson.data?.toString().split(',').map(Number) || [];
        if (device) {
            editDevice(id, {id, name, serialNumber, data});
        } else {
            const newDevice = {id: uuidv4(), name, serialNumber, data};
            addDevice(newDevice);
        }
        handleClose();
    };

    const handleClose = () => {
        setSearchParams("");
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit
            }}
        >
            <DialogTitle>
                {device ? 'Edit Device' : 'Create Device'}
            </DialogTitle>
            <DialogContent>
                <Container sx={{p: 1}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Name"
                                type="text"
                                name="name"
                                defaultValue={device?.name}
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Serial Number"
                                type="text"
                                name="serialNumber"
                                defaultValue={device?.serialNumber}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Data (comma-separated)"
                                type="number"
                                name="data"
                                required
                                defaultValue={device?.data}
                            />
                        </Grid>
                    </Grid>

                </Container>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" variant="contained" color="primary">
                    {device ? 'Save' : 'Create'}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
