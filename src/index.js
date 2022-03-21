import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

// Importing Components

// Importing Reducers
import authenticationReducer from './store/reducers/authentication'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  authenticationRed : authenticationReducer,

})

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
))

const token = localStorage.getItem('jsonwebtoken')
store.dispatch({type: 'LOGIN', payload: token})


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <BaseLayout>
          <Routes>
          </Routes>
        </BaseLayout>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);