import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/journal/bootstrap.min.css";

//Router는 React 앱을 여러 페이지로 분할하여 사용하도록 만드는 기술
//- HashRouter는 주소에 #(Hash)가 포함됨 (외부에서는 한 페이지로 보여짐)
//- BrowserRouter는 주소에 #(Hash)가 포함되지 않음
import {BrowserRouter, HashRouter} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <App />
    </HashRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
