import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import vitaLogoColor from "../static/vitaLogoColor.png";


class Landing extends Component 
{
    componentDidMount()
    {
        //Instantly bring the user to their dashboard
        //if they are already logged in
        if (this.props.security.validToken) {
            this.props.history.push("/dashboard");
        }
    }

    render() 
    {
        return (
            <div className="landing">
                <div className="light-overlay landing-inner text-dark">
                    <div className="container">
                        <div className="row" style = {{textAlign:"center",paddingTop:"20%", height:'200%'}}>
                            <div className="col-md-6 text-center">
                                <h1 className="display-3 mb-4">
                                    <img src={vitaLogoColor} />
                                </h1>
                                <h1 style = {{textAlign:"left"}}><strong style={{fontFamily:'Titillium Web', fontSize:'120%'}}>Find health insurance, appointments, and doctors with Vita</strong></h1>
                                
                                {/*<p className="lead">
                                    Create your account
                                </p>*
                                <hr /> */}
                                
                            </div>
                            <div className="col-md-6 text-center" style={{paddingTop:'8%'}}>
                                <div>
                                    <Link
                                        className="btn btn-lg btn-success mr-2"
                                        style = {{width:'50%', height:50, fontSize:'250%', fontFamily:'Titillium Web'}}
                                        to="/login"
                                    >
                                        Login
                                    </Link>
                                </div>
                                <div style = {{paddingTop:'2%'}}>
                                    <Link 
                                        className="btn btn-lg btn-primary mr-2"
                                        style = {{width:'50%', height:50, fontSize:'250%', fontFamily:'Titillium Web'}}
                                        to="/choose-role"
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Landing.propTypes = {
    security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    security: state.security,
});

export default connect(mapStateToProps)(Landing);
