import {Device, DeviceAction} from '../../types/deviceTypes';
import * as ActionTypes from '../../constants/deviceConstants';

const deviceReducer = (state: Device[], action: DeviceAction): Device[] => {
    switch (action.type) {
        case ActionTypes.ADD_DEVICE:
            return [...state, action.payload];
        case ActionTypes.EDIT_DEVICE:
            return state.map((device) => (device.id === action.payload.id ? action.payload.device : device));
        case ActionTypes.DELETE_DEVICE:
            return state.filter((device) => device.id !== action.payload);
        default:
            return state;
    }
};

export default deviceReducer;
