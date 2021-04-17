import React, { Component } from "react";
import { createNewUser, validateUser } from "../../actions/securityActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../../actions/userActions";
import Geocode from "react-geocode";
import { validatePatient } from "../../validation/patientValidator";

Geocode.setLanguage("en");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();

Geocode.setApiKey("AIzaSyDx1alSX-eHys1ZzIMmIyFO07hPmvA_5A8");

class PatientProfileEditor extends Component {
    constructor() {
        super();

        this.state = {
            userId: "",
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            latitude: "",
            longitude: "",
            smoking: false,
            drinking: false,
            age: "",
            medicalHistory: "",
            height: "",
            weight: "",
            errors: {},
            hasSuccess: false,
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    checkBoxChange(e) {
        this.setState({ [e.target.name]: e.target.checked });
    }

    async componentDidMount() {
        //Make a request to get all the user's info from the database
        const { userId } = this.props.match.params;
        this.setState({ userId: userId });
        await this.props.getCurrentUser(userId, this.props.history);

        var {
            email,
            //password,
            smoking,
            drinking,
            firstName,
            lastName,
            latitude,
            longitude,
            age,
            medicalHistory,
            height,
            weight,
        } = this.props.currentUser.currentUser;

        await Geocode.fromLatLng(latitude, longitude).then(
            (response) => {
                const address = response.results[0].formatted_address;
                this.state.address = address;
            },
            (error) => {
                console.error(error);
            }
        );

        //Add default values
        if (age == 0)
            age = "";
        if (height == 0)
            height = "";
        if (weight == 0)
            weight = "";
        if (medicalHistory == "Not provided")
            medicalHistory = "";

        //Display the user's information
        this.setState({
            smoking,
            drinking,
            email,
            latitude,
            longitude,
            //password:"a",
            firstName,
            lastName,
            age,
            medicalHistory,
            height,
            weight,
        });

        console.log(this.state.smoking)
    }

    componentWillReceiveProps(nextProps) {
        //Show errors if they exist
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    //When submitting, create the Patient
    async onSubmit(e) {
        e.preventDefault();
        //Create a new Patient account
        var newPatient;

        if (this.state.address == "") {
            newPatient = {
                userId: this.state.userId,
                email: this.state.email,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                specialization: this.state.specialization,
                smoking: this.state.smoking,
                drinking: this.state.drinking,
                age: this.state.age,
                medicalHistory: this.state.medicalHistory,
                height: this.state.height,
                weight: this.state.weight,

                latitude: 0,
                longitude: 0,
                errors: {},
            };
        } else {
            newPatient = {
                userId: this.state.userId,
                email: this.state.email,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                specialization: this.state.specialization,
                smoking: this.state.smoking,
                drinking: this.state.drinking,
                age: this.state.age,
                medicalHistory: this.state.medicalHistory,
                height: this.state.height,
                weight: this.state.weight,

                latitude: this.state.latitude,
                longitude: this.state.longitude,
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
        var frontEndErrors = validateUser(newPatient);
        validatePatient(newPatient, frontEndErrors);
        if (Object.keys(frontEndErrors).length != 0) {
            //if errors exist
            this.setState({ errors: frontEndErrors });
            return;
        }

        //Send the signup request
        await this.props.createNewUser(
            newPatient,
            "patient",
            this.props.history,
            this.props.login
        );

        if (Object.keys(this.state.errors).length == 0) {
            //if no errors exist
            const { userId } = this.props.match.params;
            this.setState({ userId: userId });
            await this.props.getCurrentUser(userId, this.props.history);

            this.setState({ hasSuccess: true });
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { errors } = this.state;

        let successMessage;
        if (this.state.hasSuccess) {
            successMessage = (
                <span>
                    <h5>Success! Account has been updated</h5>
                </span>
            );
        } else {
            successMessage = <span></span>;
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
                            ></div>
                            <h1 className="display-4 text-left page-header">
                                Your Profile
                            </h1>

                            <div className="thin-container">
                                <p className="thin-container-title text-center">
                                    Edit Your Profile
                                </p>

                                <form onSubmit={this.onSubmit}>
                                    <table>
                                        {/*Row 1*/}
                                        <tr>
                                            <td>
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className={classnames(
                                                            "form-control textbox",
                                                            {
                                                                /*
                                                                "is-invalid":
                                                                    errors.email,
                                                            */
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
                                        </tr>
                                    </table>

                                    <table>
                                        {/*Row 2*/}
                                        <tr>
                                            <td className="td-textbox-left-side">
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
                                            <td className="td-textbox-right-side">
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
                                            <td className="td-textbox-left-side">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className={classnames(
                                                            "form-control textbox"
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
                                            <td className="td-textbox-right-side">
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
                                                            {errors.age}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>

                                        {/* Row 4 */}
                                        <tr>
                                            <td className="td-textbox-left-side">
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
                                                        placeholder="Height (in)"
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
                                            <td className="td-textbox-right-side">
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
                                                        checked={this.state.smoking}
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
                                                        checked={this.state.drinking}
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

                                    <table>
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
                                                value={
                                                    this.state.medicalHistory
                                                }
                                                onChange={this.onChange}
                                            />
                                            {errors.medicalHistory && (
                                                <div className="invalid-feedback">
                                                    {errors.medicalHistory}
                                                </div>
                                            )}
                                        </div>
                                    </table>

                                    <div>{successMessage}</div>

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

PatientProfileEditor.propTypes = {
    createNewUser: PropTypes.func.isRequired,
    getCurrentUser: PropTypes.func.isRequired,
    security: PropTypes.object.isRequired,
    validateUser: PropTypes.func.isRequired,
    validatePatient: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    currentUser: state.currentUser,
    security: state.security,
    errors: state.errors,
});

export default connect(mapStateToProps, {
    createNewUser,
    getCurrentUser,
    validateUser,
    validatePatient,
})(PatientProfileEditor);
