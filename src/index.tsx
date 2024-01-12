import React from 'react';

import ReactDOM from 'react-dom';

import {DeviceProvider} from './components/DeviceContext';
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


ReactDOM.render(<App/>, document.getElementById('root'));