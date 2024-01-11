import React from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import { useDeviceContext } from '../context/DeviceContext';

const DeviceForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { devices, addDevice, editDevice } = useDeviceContext();
    const navigate = useNavigate();

    const device = devices.find((d) => d.id === id);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const name = formData.get('name') as string;
        const serialNumber = formData.get('serialNumber') as string;
        const data = formData.get('data')?.toString().split(',').map(Number) || [];

        if (device) {
            editDevice(id, { id, name, serialNumber, data });
        } else {
            const newDevice = { id: generateUUID(), name, serialNumber, data };
            addDevice(newDevice);
        }

        navigate('/');
    };

    const generateUUID = (): string => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = (Math.random() * 16) | 0;
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    };

    return (
        <div>
            <h1>{device ? 'Edit Device' : 'Create Device'}</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" defaultValue={device?.name} required />
                </label>
                <br />
                <label>
                    Serial Number:
                    <input type="text" name="serialNumber" defaultValue={device?.serialNumber} required />
                </label>
                <br />
                <label>
                    Data (comma-separated):
                    <input type="text" name="data" defaultValue={device?.data.join(',')} />
                </label>
                <br />
                <button type="submit">{device ? 'Save' : 'Create'}</button>
            </form>
        </div>
    );
};

export default DeviceForm;
