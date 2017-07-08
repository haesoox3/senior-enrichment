import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Campuses from './Campuses';

export default class Main extends Component {

  constructor () {
    super();
  }

  render () {
    return (
      <Router>
        <div id="main" className="container-fluid">
          <Route exact path="/campus" component={Campuses} />
        </div>
    </Router>
    );
  }
}
