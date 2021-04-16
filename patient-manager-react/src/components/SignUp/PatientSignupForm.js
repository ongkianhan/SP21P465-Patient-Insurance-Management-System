import React, { Component } from "react";
import { createNewUser } from "../../actions/securityActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { login, validateUser } from "../../actions/securityActions";
import { Link } from "react-router-dom";
import Geocode from "react-geocode";

Geocode.setLanguage("en");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();

Geocode.setApiKey("AIzaSyDx1alSX-eHys1ZzIMmIyFO07hPmvA_5A8");

class PatientSignupForm extends Component {
    constructor() {
        super();

        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            latitude: "",
            longitude: "",
            address: "",
            smoking: false,
            drinking: false,
            errors: {},
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        //Instantly bring the user to their dashboard
        //if they are already logged in
        if (this.props.security.validToken) {
            this.props.history.push("/dashboard");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    checkBoxChange(e) {
        this.setState({ [e.target.name]: e.target.checked });
    }

    //When submitting, create the patient
    async onSubmit(e) {
        e.preventDefault();
        //Create a new patient account
        var newPatient;

        if (this.state.address == "") {
            newPatient = {
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                smoking: this.state.smoking,
                drinking: this.state.drinking,
                age: this.state.age,
                height: this.state.height,
                weight: this.state.weight,
                medicalHistory: this.state.medicalHistory,
                errors: {},
            };
        } else {
            newPatient = {
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                smoking: this.state.smoking,
                drinking: this.state.drinking,
                age: this.state.age,
                height: this.state.height,
                weight: this.state.weight,
                medicalHistory: this.state.medicalHistory,
                errors: {},
            };
            await Geocode.fromAddress(this.state.address).then(
                (response) => {
                    newPatient.latitude =
                        response.results[0].geometry.location.lat;
                    newPatient.longitude =
                        response.results[0].geometry.location.lng;
                },
                (error) => {
                    console.error(error);
                }
            );
        }

        //Validate the user
        const frontEndErrors = validateUser(newPatient);
        if (Object.keys(frontEndErrors).length != 0) {
            //if errors exist
            this.setState({ errors: frontEndErrors });
            return;
        }

        //Send the signup request
        await this.props.createNewUser(
            newPatient,
            "patient",
            this.props.history
        );

        if (Object.keys(this.state.errors).length == 0) {
            //if no errors exist
            //Automatically login
            const LoginRequest = {
                email: this.state.email,
                password: this.state.password,
            };
            await this.props.login(LoginRequest);
            //Navigate to the dashboard
            this.props.history.push("/dashboard");
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { errors } = this.state;
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
                                <Link
                                    to="/choose-role"
                                    style={{ color: "Green" }}
                                >
                                    <strong
                                        style={{ fontFamily: "Titillium Web" }}
                                    >
                                        &lt; Go back to role selection
                                    </strong>
                                </Link>
                            </div>
                            <h1 className="display-4 text-left page-header">
                                Create an account
                            </h1>

                            <div className="thin-container">
                                <p className="thin-container-title text-center">
                                    Sign up as a Patient
                                </p>

                                <form onSubmit={this.onSubmit}>
                                    <table>
                                        {/*Row 1*/}
                                        <tr>
                                            <td className="td-textbox-holder">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className={classnames(
                                                            "form-control textbox",
                                                            {
                                                                "is-invalid":
                                                                    errors.email,
                                                            }
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
                                            </td>
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
                                    </table>

                                    <p className="thin-container-title text-center">
                                        Optional Information
                                    </p>
                                    <table>
                                        {/* Row 3 */}
                                        <tr>
                                            <td className="td-textbox-holder">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className={classnames(
                                                            "form-control textbox",
                                                            {
                                                                /*
                                                                "is-invalid":
                                                                    errors.address,
                                                            */
                                                            }
                                                        )}
                                                        placeholder="Address (optional)"
                                                        name="address"
                                                        value={
                                                            this.state.address
                                                        }
                                                        onChange={this.onChange}
                                                    />
                                                    {errors.address && (
                                                        <div className="invalid-feedback">
                                                            {errors.address}
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
                                                                    errors.age,
                                                            }
                                                        )}
                                                        placeholder="Age"
                                                        name="age"
                                                        value={this.state.age}
                                                        onChange={this.onChange}
                                                    />
                                                    {errors.age && (
                                                        <div className="invalid-feedback">
                                                            {errors.lastNageame}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>

                                        {/* Row 4 */}
                                        <tr>
                                            <td className="td-textbox-holder">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className={classnames(
                                                            "form-control textbox",
                                                            {
                                                                "is-invalid":
                                                                    errors.height,
                                                            }
                                                        )}
                                                        placeholder="Height (ft)"
                                                        name="height"
                                                        value={
                                                            this.state.height
                                                        }
                                                        onChange={this.onChange}
                                                    />
                                                    {errors.height && (
                                                        <div className="invalid-feedback">
                                                            {errors.height}
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
                                                                    errors.weight,
                                                            }
                                                        )}
                                                        placeholder="Weight (lbs)"
                                                        name="weight"
                                                        value={
                                                            this.state.weight
                                                        }
                                                        onChange={this.onChange}
                                                    />
                                                    {errors.weight && (
                                                        <div className="invalid-feedback">
                                                            {errors.weight}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>

                                        {/* Row 5 */}
                                        <tr>
                                            <td className="td-form-check">
                                                <div className="form-group">
                                                    <input
                                                        className={classnames(
                                                            "form-check-input"
                                                        )}
                                                        type="checkbox"
                                                        onChange={this.checkBoxChange.bind(
                                                            this
                                                        )}
                                                        name="smoking"
                                                        id="smoking"
                                                    ></input>
                                                    <label className="form-check-label">
                                                        Do you smoke?
                                                    </label>
                                                </div>
                                            </td>
                                            <td className="td-form-check">
                                                <div className="form-group">
                                                    <input
                                                        className={classnames(
                                                            "form-check-input"
                                                        )}
                                                        type="checkbox"
                                                        onChange={this.checkBoxChange.bind(
                                                            this
                                                        )}
                                                        name="drinking"
                                                        id="drinking"
                                                    ></input>
                                                    <label className="form-check-label">
                                                        Do you drink alcohol?
                                                    </label>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>

                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className={classnames(
                                                "form-control textbox",
                                                {
                                                    "is-invalid":
                                                        errors.medicalHistory,
                                                }
                                            )}
                                            placeholder="List any chronic diseases or other medical history details"
                                            name="medicalHistory"
                                            rows="2"
                                            value={this.state.medicalHistory}
                                            onChange={this.onChange}
                                        />
                                        {errors.medicalHistory && (
                                            <div className="invalid-feedback">
                                                {errors.medicalHistory}
                                            </div>
                                        )}
                                    </div>

                                    {/*Submit button*/}
                                    <div className="row justify-content-center">
                                        <input
                                            type="submit"
                                            className="button-submit button-primary"
                                            value="Create Account"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <p><b>Your Privacy</b></p>
                    <p>Your email will be publicly available on your profile so that others can chat with you.</p>
                    <p>Your address will be used to show your location on Google Maps relative to hospitals.</p>
                    <p>Your medical details will be available to doctors and insurance providers to help them assess your condition. 
                    Without these details, doctors will be unable to determine your needs in advance. </p>
                    <br/>
                    <br/>
                </div>
            </div>
        );
    }
}

PatientSignupForm.propTypes = {
    createNewUser: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    validateUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    errors: state.errors,
    security: state.security,
});

export default connect(mapStateToProps, { createNewUser, login, validateUser })(
    PatientSignupForm
);
