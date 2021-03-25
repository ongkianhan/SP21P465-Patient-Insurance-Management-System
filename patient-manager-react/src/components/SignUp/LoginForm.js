import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { login } from "../../actions/securityActions";

class LoginForm extends Component 
{
    constructor()
    {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() 
    {
        //Instantly bring the user to their dashboard
        //if they are already logged in
        if (this.props.security.validToken) {
            this.props.history.push("/dashboard");
        }
    }

    componentWillReceiveProps(nextProps) 
    {
        //Instantly bring the user to their dashboard
        //if they are already logged in
        if (nextProps.security.validToken) {
            this.props.history.push("/dashboard");
        }

        //Show errors if they exist
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    //Attempt to login
    onSubmit(e) 
    {
        e.preventDefault();
        const LoginRequest = {
            email: this.state.email,
            password: this.state.password,
        };

        this.props.login(LoginRequest);
    }

    onChange(e) 
    {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() 
    {
        const { errors } = this.state;
        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            {/*Header*/}
                            <h1 className="display-4 text-left page-header">Log In</h1>

                            <div className="thin-container">
                                <p className="thin-container-title text-center"></p>

                                <form onSubmit={this.onSubmit}>    
                                    {/*Column 1*/}
                                    <table>
                                        {/*Row 1*/}
                                        <tr>
                                            <td>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className={classnames(
                                                        "form-control textbox", {"is-invalid": errors.email}
                                                    )}
                                                    placeholder="Email address"
                                                    name="email"
                                                    value={this.state.email}
                                                    onChange={this.onChange}
                                                />
                                                {errors.email && (
                                                    <div className="invalid-feedback">
                                                        {errors.email}
                                                    </div>
                                                )}
                                            </div>
                                            </td>
                                        </tr>
                                        {/*Row 2*/}
                                        <tr>
                                            <td>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className={classnames(
                                                        "form-control textbox", {"is-invalid": errors.password}
                                                    )}
                                                    placeholder="Password"
                                                    name="password"
                                                    value={this.state.password}
                                                    onChange={this.onChange}
                                                />
                                                {errors.password && (
                                                    <div className="invalid-feedback">
                                                        {errors.password}
                                                    </div>
                                                )}
                                            </div>
                                            </td>
                                        </tr>
                                    </table>
                                    {/*Submit button*/}
                                    <div className="row justify-content-center">
                                        <input
                                            type="submit"
                                            className="button-submit button-primary"
                                            value="Log in"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

LoginForm.propTypes = {
    login: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    security: state.security,
    errors: state.errors,
});

export default connect(mapStateToProps, { login })(LoginForm);
