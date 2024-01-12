import React, { createContext, useContext, ReactNode, useReducer, useEffect } from 'react';

interface Device {
    id: string;
    name: string;
    serialNumber: string;
    data: number[];
}

interface DeviceContextProps {
    devices: Device[];
    dispatch: React.Dispatch<DeviceAction>;
}

type DeviceAction =
    | { type: 'ADD_DEVICE'; payload: Device }
    | { type: 'EDIT_DEVICE'; payload: { id: string; device: Device } }
    | { type: 'DELETE_DEVICE'; payload: string };

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

const deviceReducer = (state: Device[], action: DeviceAction): Device[] => {
    switch (action.type) {
        case 'ADD_DEVICE':
            return [...state, action.payload];
        case 'EDIT_DEVICE':
            return state.map((device) => (device.id === action.payload.id ? action.payload.device : device));
        case 'DELETE_DEVICE':
            return state.filter((device) => device.id !== action.payload);
        default:
            return state;
    }
};

export const DeviceProvider: React.FC<DeviceProviderProps> = ({ children }) => {
    const [devices, dispatch] = useReducer(deviceReducer, [], (initial) => {
        try {
            const storedDevices = localStorage.getItem('devices');
            return storedDevices ? JSON.parse(storedDevices) : initial;
        } catch (error) {
            console.error('Error parsing stored devices:', error);
            return initial;
        }
    });

    useEffect(() => {
        localStorage.setItem('devices', JSON.stringify(devices));
    }, [devices]);

    const contextValue: DeviceContextProps = {
        devices,
        dispatch,
    };

    return <DeviceContext.Provider value={contextValue}>{children}</DeviceContext.Provider>;
};
