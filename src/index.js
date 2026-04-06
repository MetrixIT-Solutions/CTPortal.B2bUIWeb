/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { unstable_HistoryRouter as Router } from 'react-router-dom';

import './assets/css/style.css';
import './assets/css/color_theme.css';
import './assets/css/skin_color.css';
import './assets/css/vendors_css.css';
import './assets/css/leadStyles.css';

import history from './hashHistory';
import App from './App';

import jQuery from 'jquery';

import $ from 'jquery';
window.jQuery = $;
window.$ = $;
global.jQuery = $;

/** ========== Start: Redux Implementation =========== */
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';

import rootReducer from './reducers';
import rootSaga from './sagas';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// then run the saga
sagaMiddleware.run(rootSaga);
/** ========== End: Redux Implementation =========== */


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);
