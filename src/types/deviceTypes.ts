import * as ActionTypes from '../constants/deviceConstants';

export interface Device {
    id: string;
    name: string;
    serialNumber: string;
    data: number[];
}

export interface DeviceContextProps {
    devices: Device[];
    dispatch: React.Dispatch<DeviceAction>;
}

export type DeviceAction =
    | { type: typeof ActionTypes.ADD_DEVICE; payload: Device }
    | { type: typeof ActionTypes.EDIT_DEVICE; payload: { id: string; device: Device } }
    | { type: typeof ActionTypes.DELETE_DEVICE; payload: string };
