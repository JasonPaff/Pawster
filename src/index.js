import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import "./styles/tailwind.output.css";

import App from './App';

import BaseLayout from './BaseLayout';
import Landing from './pages/Landing';
import Login from './components/Authentication/Login';
import Logout from './components/Authentication/Logout';


// Importing Reducers
import authenticationReducer from './store/reducers/authentication';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  authenticationRed : authenticationReducer,

});

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

const token = localStorage.getItem('jsonwebtoken');
store.dispatch({type: 'LOGIN', payload: token});

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);