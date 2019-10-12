import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import FlightNumber from './FlightNumber';
import QuestionClass from './QuestionClass';

import { HashRouter as Router, Route } from "react-router-dom";

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));


function Main() {
  return (
      <Provider store={store}>
        <Router >
          <div id="routes">
            <Route path="/" exact component={FlightNumber} />
            <Route path="/quiz" component={QuestionClass} />
          </div>
        </Router>
      </Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Main />, rootElement);
