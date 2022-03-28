import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import App from "./App";
import "./styles/tailwind.output.css";

// Importing Reducers
import authenticationReducer from "./store/reducers/authentication";
import hostsReducer from "./store/reducers/hosts";
import filtersReducer from "./store/reducers/filters";
import petReducer from "./store/reducers/pets";
import { apolloClient } from "./utils/apolloClient";
import { ApolloProvider } from "@apollo/client";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  authenticationRed: authenticationReducer,
  hostsRed: hostsReducer,
  filtersRed: filtersReducer,
  petRed: petReducer,
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const token = localStorage.getItem("token");
store.dispatch({ type: "LOGIN", payload: token });

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ApolloProvider client={apolloClient}>
          <App />
        </ApolloProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
