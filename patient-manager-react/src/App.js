import React, { Component } from "react";
import "./App.css";
//import Dashboard from "./components/Dashboard";
//import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import DoctorSearch from "./components/UserSearch/DoctorSearch.js";

class App extends Component 
{
  render() 
  {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            {/*<Header />*/}
            <Route exact path="/" component={DoctorSearch} />
            {/*<Route exact path="/" component={Dashboard} />
            <Route exact path="/dashboard" component={Dashboard} />*/}
            <Route exact path="/find-doctors" component={DoctorSearch} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
