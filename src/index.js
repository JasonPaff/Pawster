import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

// Importing Components
import App from './App';
import Map from './parts/Map';
import BaseLayout from './BaseLayout';
import Landing from './pages/Landing';
import Login from './components/Authentication/Login'
import Logout from './components/Authentication/Logout'

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
            <Route path="/" element={<Landing />}></Route>
            <Route path="/map" element={<Map />}></Route>
            <Route path="/search" element={<App />}></Route>
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </BaseLayout>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);