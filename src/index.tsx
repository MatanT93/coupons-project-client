import React, { useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { App } from './Components/App/App';
import axios from 'axios';
import { authStore } from './Redux/AuthStore';
import { useNavigate } from "react-router-dom";

// make axios add the token (if found) to the request header
axios.interceptors.request.use(function (config) {
  if(localStorage.my_token && authStore.getState().iat > (Date.now() / 1000))
      config.headers.Authorization = "Bearer " + localStorage.my_token;
  else {
    alert("ERROR! Unauthorized please login");
    localStorage.clear();
    window.location.href = '/';
  }
  console.log(localStorage.my_token.iat + " " + authStore.getState().iat + " " + (Date.now() / 1000))
  return config;
});

axios.interceptors.response.use(
  (response) => response, 
  (error) => {
     if (error.response.status === 404) {
        useRef(useNavigate()).current('/notfound');
     }
     if (error.response.status === 401) {
      alert("ERROR! Unauthorized please login");
      window.location.href = '/';
   }
  },
);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
