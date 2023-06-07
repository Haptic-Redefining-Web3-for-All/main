import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MoralisProvider } from "react-moralis";

const envData = {
      serverUrl : process.env.REACT_APP_MORALIS_SERVER_URL,
      appId : process.env.REACT_APP_MORALIS_APP_ID
}

const root = ReactDOM.createRoot(document.getElementById('root'));
console.log("SERVER URL", envData.serverUrl);
console.log("APPID", envData.appId)
root.render(
  <React.StrictMode>
    <MoralisProvider serverUrl={envData.serverUrl} appId={envData.appId}>
      <App />
    </MoralisProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
