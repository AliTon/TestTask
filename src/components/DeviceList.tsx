import React from 'react';
import { Link } from 'react-router-dom';
import { useDeviceContext } from '../context/DeviceContext';

const DeviceList: React.FC = () => {
    const { devices } = useDeviceContext();

    return (
        <div>
            <h1>Device List</h1>
            <Link to={'/new'} >Create</Link>
            <ul>
                {devices.map((device) => (
                    <li key={device.id}>
                        <Link to={`/device/${device.id}`}>{device.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DeviceList;
