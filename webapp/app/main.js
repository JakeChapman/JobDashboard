import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import Application from './components/Application.js';
require('babel-register')({
    "presets": ["es2015"]
});
ReactDOM.render(<App content={<Application/>} calendar={true}/>, document.getElementById('root'));
