import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

interface Device {
    id: string;
    name: string;
    serialNumber: string;
    data: number[];
}

interface DeviceContextProps {
    devices: Device[];
    addDevice: (device: Device) => void;
    editDevice: (id: string, device: Device) => void;
    deleteDevice: (id: string) => void;
}

const DeviceContext = createContext<DeviceContextProps | undefined>(undefined);

export const useDeviceContext = () => {
    const context = useContext(DeviceContext);
    if (!context) {
        throw new Error('useDeviceContext must be used within a DeviceProvider');
    }
    return context;
};

interface DeviceProviderProps {
    children: ReactNode;
}

export const DeviceProvider: React.FC<DeviceProviderProps> = ({ children }) => {
    const [devices, setDevices] = useState<Device[]>([]);

    const addDevice = (device: Device) => {
        setDevices([...devices, device]);
    };

    const editDevice = (id: string, updatedDevice: Device) => {
        setDevices(devices.map((device) => (device.id === id ? updatedDevice : device)));
    };

    const deleteDevice = (id: string) => {
        setDevices(devices.filter((device) => device.id !== id));
    };

    useEffect(() => {
        const storedDevices = localStorage.getItem('devices');
        if (storedDevices) {
            setDevices(JSON.parse(storedDevices));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('devices', JSON.stringify(devices));
    }, [devices]);

    const contextValue: DeviceContextProps = {
        devices,
        addDevice,
        editDevice,
        deleteDevice,
    };

    return <DeviceContext.Provider value={contextValue}>{children}</DeviceContext.Provider>;
};
