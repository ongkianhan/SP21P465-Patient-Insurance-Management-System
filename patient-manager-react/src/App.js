import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import SecuredRoute from "./securityUtils/SecuredRoute";

import DoctorSearch from "./components/UserSearch/DoctorSearch.js";
import DoctorSignupForm from "./components/SignUp/DoctorSignupForm";
import PatientSignupForm from "./components/SignUp/PatientSignupForm";
import InsurerSignupForm from "./components/SignUp/InsurerSignupForm";
import Login from "./components/SignUp/LoginForm";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import Landing from "./components/Landing";
import Register from "./components/SignUp/Register"; //temporary
import GeneralSignupForm from "./components/SignUp/GeneralSignupForm";

class App extends Component 
{
  render() 
  {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <span style={{marginLeft: "25vh", marginRight: "25vh"}}>

            {
              //Public routes
            }
            <Route exact path="/" component={Landing} />
            <Route exact path="/choose-role" component={GeneralSignupForm} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/patient-signup" component={PatientSignupForm} />
            <Route exact path="/doctor-signup" component={DoctorSignupForm} />
            <Route exact path="/insurer-signup" component={InsurerSignupForm} />

            {
                //Private routes only accessible to users logged in
            }
            <SecuredRoute exact path="/dashboard" component={Dashboard} />
            <SecuredRoute exact path="/find-doctors" component={DoctorSearch} />
            
            </span>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
