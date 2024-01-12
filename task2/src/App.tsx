import React from 'react';

import {DeviceProvider} from './state/context/DeviceContext';
import DeviceList from './components/DeviceList';

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DeviceList/>
    },
]);

const App: React.FC = () => {
    return (
        <DeviceProvider>
            <RouterProvider router={router}/>
        </DeviceProvider>
    );
};

export default App;