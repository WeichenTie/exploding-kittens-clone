import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import Login from './screen/login/Login';

import reportWebVitals from './reportWebVitals';
import store from './redux/Store'
import { Provider } from 'react-redux'
import App from './App';


const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    // <React.StrictMode>
        <Provider store={store}>
            <App></App>
        </Provider>
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
