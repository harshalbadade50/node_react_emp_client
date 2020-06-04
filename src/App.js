import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers/index.js';
import { Provider } from 'react-redux';
import history from './components/history.js';

import LoginComponent from './components/Login/LoginComponent.jsx';
import EmployeeComponent from './components/Employee/EmployeeComponent.jsx';
import ReviewListComponent from './components/User/ReviewList.jsx';

import logo from './logo.svg';
import './App.css';

const store = createStore(reducer, applyMiddleware(thunk));
class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      //Display component as per Route path
      <Provider store={store}>
        <div className="App" >
          <Router history={history}>
            <Switch>
              <Route exact path='/' component={LoginComponent} />
              <Route path='/admin' component={EmployeeComponent} />
              <Route path='/user' component={ReviewListComponent} />
            </Switch>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
