import React, { Component } from 'react'
import { connect } from "react-redux";
import { PropTypes } from "prop-types"
import { Link } from "react-router-dom";

class BasicLogin extends Component{
    constructor(props){
        super(props);
        this.state={username:'', password:'', email:'', firstName:'', lastName:''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        if(this.props.role == 'doctor'){
            alert('A Doctor was submitted: ' + this.state.username);
        }
        else if(this.props.role == 'patient'){
            alert('A Patient was submitted: ' + this.state.username);
        }
        else if(this.props.role == 'insurer'){
            alert('An Insurer was submitted: ' + this.state.username);
        }
        else{
            alert('what');
        }
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>Username</label>
                    <br></br>
                    <input name='username' value={this.state.username} onChange={this.handleChange} />
                </div>
                <div>
                    <label>Password</label>
                    <br></br>
                    <input name='password' value={this.state.password} onChange={this.handleChange} />
                </div>
                <div>
                    <label>Email</label>
                    <br></br>
                    <input name='email' value={this.state.email} onChange={this.handleChange} />
                </div>
                <div>
                    <label>First Name</label>
                    <br></br>
                    <input name='firstName' value={this.state.firstName} onChange={this.handleChange} />
                </div>
                <div>
                    <label>Last Name</label>
                    <br></br>
                    <input name='lastName' value={this.state.lastName} onChange={this.handleChange} />
                </div>
                <br></br>
                    <input type="submit" value="Create Account"/>
            </form>
        );
    }
}
export default BasicLogin;