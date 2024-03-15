import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './homepage';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router2 = createBrowserRouter([
  {
    element: <App />, path: "/"
  },
  { element: <Home />, path: "/homepage" }
])
root.render(
  <React.StrictMode>
    < RouterProvider router= {router2} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
