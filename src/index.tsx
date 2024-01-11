import React from 'react';

import ReactDOM from 'react-dom';

import { DeviceProvider } from './context/DeviceContext';
import DeviceList from './components/DeviceList';
import DeviceForm from './components/DeviceForm';

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DeviceList/>
    },
    {
        path: "/device/:id",
        element: <DeviceForm/>
    },
    {
        path: "/new",
        element: <DeviceForm/>
    },
]);

const App: React.FC = () => {
    return (
        <DeviceProvider>
            <RouterProvider router={router} />
        </DeviceProvider>
    );
};

export default App;


ReactDOM.render(<App />, document.getElementById('root'));