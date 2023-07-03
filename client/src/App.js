import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";

/**
 * main componenet that handle all the app
 */
class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={(props) => <Home {...props} />} />
        </Switch>
      </Router>
    );
  }
}

export default App;
