import React, {useState} from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDeviceContext } from '../state/context/DeviceContext';
import {
    Button,
    TextField,
    Container,
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slide,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { addDevice, editDevice } from '../state/actions/deviceActions';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef<unknown, TransitionProps>(
    function Transition(props, ref) {
        return <Slide direction="down" ref={ref} {...props} />;
    }
);

export default function DeviceForm({ open }: { open: boolean }) {
    let [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get('id');
    const { dispatch, devices } = useDeviceContext();
    const device = devices.find((d) => d.id === id);

    const [validationError, setValidationError] = useState<string | null>(null);

    const handleDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const isValid = /^[0-9-]*$/.test(value);
        setValidationError(isValid ? null : 'Only numbers and hyphens are allowed');
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());
        const name = formJson.name;
        const serialNumber = formJson.serialNumber;
        const data = formJson.data?.toString().split('-').map(Number) || [];

        if (device) {
            dispatch(editDevice(id, { id, name, serialNumber, data }));
        } else {
            const newDevice = { id: uuidv4(), name, serialNumber, data };
            dispatch(addDevice(newDevice));
        }

        handleClose();
    };

    const handleClose = () => {
        setSearchParams('');
    };

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit,
            }}
        >
            <DialogTitle>{device ? 'Edit Device' : 'Create Device'}</DialogTitle>
            <DialogContent>
                <Container sx={{ p: 1 }}>
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
                                label="Data"
                                name="data"
                                required
                                defaultValue={device?.data.join('-')}
                                placeholder={'1234-5678-8765'}
                                InputProps={{
                                    onChange: handleDataChange,
                                    pattern: '^[0-9-]*$',
                                }}
                                helperText={validationError}
                                error={Boolean(validationError)}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" variant="contained" disabled={Boolean(validationError)} color="primary">
                    {device ? 'Save' : 'Create'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
