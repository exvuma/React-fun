import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppChild from './AppChild';
import UserSettingsPage from './UserSettingsPage';
import Route from './Route';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<UserSettings />, document.getElementById('root'));
// ReactDOM.render(<AppChild />, document.getElementById('root'));
// ReactDOM.render(<Route />, document.getElementById('route1'));
// ReactDOM.render(<Routes />, document.getElementById('route2'));
registerServiceWorker();
