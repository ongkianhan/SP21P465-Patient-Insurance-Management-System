import React, { Component } from "react";
import { createNewUser, validateUser } from "../../actions/securityActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../../actions/userActions";

class InsurerProfileEditor extends Component {
    constructor() {
        super();

        this.state = {
            userId: "",
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            firmName:"",
            errors: {},
            hasSuccess:false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    async componentDidMount()
    {
        //Make a request to get all the user's info from the database
        const {userId} = this.props.match.params;
        this.setState({userId: userId});
        await this.props.getCurrentUser(userId, this.props.history);

        const {
            email,
            //password,
            firstName,
            lastName,
            firmName,
        } = this.props.currentUser.currentUser;
        //Display the user's information
        this.setState({
            email,
            //password:"a",
            firstName,
            lastName,
            firmName,
        });
    }


    componentWillReceiveProps(nextProps) {
        //Show errors if they exist
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }

        //Set the state to the current user's info so that it shows on the page
       
    }
    
    

    //When submitting, create the insurer
    async onSubmit(e) {
        e.preventDefault();
        //Create a new insurer account
        const newInsurer = {
            userId: this.state.userId,
            email: this.state.email,
            //password: "a",
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            firmName: this.state.firmName,
            errors: {},
        };
    
        //Validate the user
        const frontEndErrors = validateUser(newInsurer)
        if (Object.keys(frontEndErrors).length != 0) //if errors exist
        {
            this.setState({ errors: frontEndErrors });
            return;
        }

        //Send the signup request
        await this.props.createNewUser(newInsurer, "insurer", this.props.history, this.props.login);

        if (Object.keys(this.state.errors).length == 0) //if no errors exist
        {
            const {userId} = this.props.match.params;
            this.setState({userId: userId});
            await this.props.getCurrentUser(userId, this.props.history);
            
            this.setState({hasSuccess:true})
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { errors } = this.state;

        let successMessage;
        if(this.state.hasSuccess){
            successMessage = (
                <span>
                    <h5>
                    Success! Account has been successfully updated
                    </h5>
                </span>
            );
        }
        else{
            successMessage = (
                <span>
                </span>
            );
        }

        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {/*Header*/}
                            <div
                                className="text-left"
                                style={{ paddingTop: "2%" }}
                            >
                            </div>
                            <h1 className="display-4 text-left page-header">
                                Your Profile
                            </h1>

                            <div className="thin-container">
                                <p className="thin-container-title text-center">
                                    Edit Your Profile
                                </p>

                                <form onSubmit={this.onSubmit}>
                                    {/*Column 1*/}
                                    <table>
                                        {/*Row 1*/}
                                        <tr>
                                            <td className="td-textbox-holder">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className={classnames(
                                                            "form-control textbox",
                                                            {/*
                                                                "is-invalid":
                                                                    errors.email,
                                                            */}
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
                                            <td className="td-textbox-holder">
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className={classnames(
                                                        "form-control textbox", {"is-invalid": errors.firmName}
                                                    )}
                                                    placeholder="Company name"
                                                    name="firmName"
                                                    value={this.state.firmName}
                                                    onChange={this.onChange}
                                                />
                                                {errors.firmName && (
                                                    <div className="invalid-feedback">
                                                        {errors.firmName}
                                                    </div>
                                                )}
                                            </div>
                                            </td>
                                            {/*
                                            <td className="td-textbox-holder">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className={classnames(
                                                            "form-control textbox",
                                                            {
                                                                "is-invalid":
                                                                    errors.password,
                                                            }
                                                        )}
                                                        placeholder="Password"
                                                        name="password"
                                                        value={
                                                            this.state.password
                                                        }
                                                        onChange={this.onChange}
                                                    />
                                                    {errors.password && (
                                                        <div className="invalid-feedback">
                                                            {errors.password}
                                                        </div>
                                                    )}
                                                </div>
                                            </td> */}
                                        </tr>
                                        {/*Row 2*/}
                                        <tr>
                                            <td className="td-textbox-holder">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className={classnames(
                                                            "form-control textbox",
                                                            {
                                                                "is-invalid":
                                                                    errors.firstName,
                                                            }
                                                        )}
                                                        placeholder="First name"
                                                        name="firstName"
                                                        value={
                                                            this.state.firstName
                                                        }
                                                        onChange={this.onChange}
                                                    />
                                                    {errors.firstName && (
                                                        <div className="invalid-feedback">
                                                            {errors.firstName}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="td-textbox-holder">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className={classnames(
                                                            "form-control textbox",
                                                            {
                                                                "is-invalid":
                                                                    errors.lastName,
                                                            }
                                                        )}
                                                        placeholder="Last name"
                                                        name="lastName"
                                                        value={
                                                            this.state.lastName
                                                        }
                                                        onChange={this.onChange}
                                                    />
                                                    {errors.lastName && (
                                                        <div className="invalid-feedback">
                                                            {errors.lastName}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                        {/*Row 3*/}
                                    </table>
                                    <div>
                                    {successMessage}
                                    </div>
                                    {/*Submit button*/}
                                    <div className="row justify-content-center">
                                        <input
                                            type="submit"
                                            className="button-submit button-primary"
                                            value="Update Account"
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

InsurerProfileEditor.propTypes = {
    createNewUser: PropTypes.func.isRequired,
    getCurrentUser: PropTypes.func.isRequired,
    security: PropTypes.object.isRequired,
    validateUser: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    currentUser: state.currentUser,
    security: state.security,
    errors: state.errors
});

export default connect(mapStateToProps, { createNewUser, getCurrentUser, validateUser })(InsurerProfileEditor);