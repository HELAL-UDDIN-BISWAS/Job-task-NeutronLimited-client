import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Page/Home/Home.jsx';
import Root from './Root/Root.jsx';
import AddContacts from './Page/AddContacts/AddContacts.jsx';
import AllContacts from './Page/AllContacts/AllContacts.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/addcontacts',
        element: <AddContacts/>
      },
      {
        path: '/allcontacts',
        element: <AllContacts/>
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>,
)
