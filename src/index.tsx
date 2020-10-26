import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {createApi} from './api';
import {createStore, compose, applyMiddleware} from "redux";
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {reducer, Operation} from './reducer';


const api = createApi();

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
    )
);

store.dispatch(Operation.loadPersons());


ReactDOM.render(
    <React.StrictMode>
      <Provider store = {store}>
        <App />
      </Provider>

    </React.StrictMode>,
    document.getElementById(`root`)
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
