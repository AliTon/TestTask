import React, { createContext, useContext, ReactNode, useReducer, useEffect } from 'react';
import deviceReducer from '../reducers/deviceReducer';
import { DeviceContextProps, DeviceAction } from '../../types/deviceTypes';

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
