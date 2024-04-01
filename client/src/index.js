import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore ,combineReducers} from 'redux';
import { rootreducer } from './redux/rootreducer';

const finalReducer = combineReducers({
  rootreducer: rootreducer
});

const initialState = {
  rootreducer: {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
  } 
};

const store = createStore(finalReducer, initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


reportWebVitals();
