import React, { Component } from "react";
import "./App.css";
//import Dashboard from "./components/Dashboard";
//import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import DoctorSearch from "./components/UserSearch/DoctorSearch.js";
import GeneralSignupForm from "./components/SignUp/GeneralSignupForm";
import DoctorSignupForm from "./components/SignUp/DoctorSignupForm";
import PatientSignupForm from "./components/SignUp/PatientSignupForm";
import ProviderSignupForm from "./components/SignUp/ProviderSignupForm";

class App extends Component 
{
  render() 
  {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            {/*<Header />*/}
            <Route exact path="/" component={GeneralSignupForm} />
            {/*<Route exact path="/" component={Dashboard} />
            <Route exact path="/dashboard" component={Dashboard} />*/}
            <Route exact path="/find-doctors" component={DoctorSearch} />
            <Route exact path="/patient-signup" component={PatientSignupForm} />
            <Route exact path="/doctor-signup" component={DoctorSignupForm} />
            <Route exact path="/provider-signup" component={ProviderSignupForm} />
          
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
