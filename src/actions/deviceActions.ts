import { Device, DeviceAction } from '../types/deviceTypes';
import * as ActionTypes from '../constants/deviceConstants';

export const addDevice = (device: Device): DeviceAction => ({ type: ActionTypes.ADD_DEVICE, payload: device });

export const editDevice = (id: string, updatedDevice: Device): DeviceAction => ({
    type: ActionTypes.EDIT_DEVICE,
    payload: { id, device: updatedDevice },
});

export const deleteDevice = (id: string): DeviceAction => ({ type: ActionTypes.DELETE_DEVICE, payload: id });
