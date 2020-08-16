import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Articles from './components/Articles/Articles';

import { Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
const history = createHistory();

ReactDOM.render(
    <Router history={history}>
        <div>
            <Route path="/" component={Header} />
            <Route exact path="/" component={App} />
            <Route exact path="/articles" component={Articles} />
            <Route path="/" component={Footer} />
        </div>
    </Router>
, document.getElementById('root'));
registerServiceWorker();
