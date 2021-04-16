import React, { Component } from "react";
import { createNewUser, validateUser } from "../../actions/securityActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { getCurrentUser } from "../../actions/userActions";
import Geocode from "react-geocode";
import { validateDoctor } from "../../validation/doctorValidator";

Geocode.setLanguage("en");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();

Geocode.setApiKey("AIzaSyDx1alSX-eHys1ZzIMmIyFO07hPmvA_5A8");

class DoctorProfileEditor extends Component {
    constructor() {
        super();

        this.state = {
            userId: "",
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            specialization: "",
            hospitalName: "",
            latitude: "",
            longitude: "",
            address: "",
            supportsCovidCare: false,
            errors: {},
            hasSuccess: false,
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    async componentDidMount() {
        //Make a request to get all the user's info from the database
        const { userId } = this.props.match.params;
        this.setState({ userId: userId });
        await this.props.getCurrentUser(userId, this.props.history);

        const {
            email,
            firstName,
            lastName,
            specialization,
            hospitalName,
            latitude,
            longitude,
            supportsCovidCare,
        } = this.props.currentUser.currentUser;
        //Display the user's information

        await Geocode.fromLatLng(latitude, longitude).then(
            (response) => {
                const address = response.results[0].formatted_address;
                this.state.address = address;
            },
            (error) => {
                console.error(error);
            }
        );

        this.setState({
            email,
            firstName,
            lastName,
            specialization,
            hospitalName,
            supportsCovidCare,
        });
    }

    componentWillReceiveProps(nextProps) {
        //Show errors if they exist
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    //When submitting, create the doctor
    async onSubmit(e) {
        e.preventDefault();
        //Create a new doctor account
        const newDoctor = {
            userId: this.state.userId,
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            specialization: this.state.specialization,
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            hospitalName: this.state.hospitalName,
            supportsCovidCare: this.state.supportsCovidCare,
            errors: {},
        };

        await Geocode.fromAddress(this.state.address).then(
            (response) => {
                newDoctor.latitude = response.results[0].geometry.location.lat;
                newDoctor.longitude = response.results[0].geometry.location.lng;
            },
            (error) => {
                console.error(error);
            }
        );

        //Validate the user
        var frontEndErrors = validateUser(newDoctor);
        validateDoctor(newDoctor, frontEndErrors);
        if (Object.keys(frontEndErrors).length != 0) {
            //if errors exist
            this.setState({ errors: frontEndErrors });
            return;
        }

        //Send the signup request
        await this.props.createNewUser(
            newDoctor,
            "doctor",
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

    setSupportsCovidCare(e) {
        this.setState({ [e.target.name]: e.target.checked });
    }

    render() {
        const { errors } = this.state;

        let successMessage;
        if (this.state.hasSuccess) {
            successMessage = (
                <span>
                    <h5 className="pt-3">
                        Success! Account has been successfully updated
                    </h5>
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
                                    {/*Column 1*/}
                                    <table>
                                        {/*Row 1*/}
                                        <tr>
                                            <td className="td-textbox-left-side">
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
                                            <td className="td-textbox-right-side">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className={classnames(
                                                            "form-control textbox",
                                                            {
                                                                "is-invalid":
                                                                    errors.address,
                                                            }
                                                        )}
                                                        placeholder="Address"
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
                                        </tr>
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
                                        {/*Row 3*/}
                                        <tr>
                                            <td className="td-textbox-left-side">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className={classnames(
                                                            "form-control textbox",
                                                            {
                                                                "is-invalid":
                                                                    errors.specialization,
                                                            }
                                                        )}
                                                        placeholder="Specialization"
                                                        name="specialization"
                                                        value={
                                                            this.state
                                                                .specialization
                                                        }
                                                        onChange={this.onChange}
                                                    />
                                                    {errors.specialization && (
                                                        <div className="invalid-feedback">
                                                            {
                                                                errors.specialization
                                                            }
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
                                                                    errors.hospitalName,
                                                            }
                                                        )}
                                                        placeholder="Hospital name"
                                                        name="hospitalName"
                                                        value={
                                                            this.state
                                                                .hospitalName
                                                        }
                                                        onChange={this.onChange}
                                                    />
                                                    {errors.hospitalName && (
                                                        <div className="invalid-feedback">
                                                            {
                                                                errors.hospitalName
                                                            }
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                    <table>
                                        <tr>
                                            <td className="td-form-check">
                                                <div className="form-group">
                                                    <input
                                                        className={classnames(
                                                            "form-check-input"
                                                        )}
                                                        type="checkbox"
                                                        checked={
                                                            this.state
                                                                .supportsCovidCare
                                                        }
                                                        onChange={this.setSupportsCovidCare.bind(
                                                            this
                                                        )}
                                                        id="supportsCovidCareCheckbox"
                                                        name="supportsCovidCare"
                                                    ></input>
                                                    <label className="form-check-label">
                                                        Do you offer COVID-19
                                                        care?
                                                    </label>
                                                </div>
                                            </td>
                                        </tr>
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

DoctorProfileEditor.propTypes = {
    createNewUser: PropTypes.func.isRequired,
    getCurrentUser: PropTypes.func.isRequired,
    security: PropTypes.object.isRequired,
    validateUser: PropTypes.func.isRequired,
    validateDoctor: PropTypes.func.isRequired,
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
    validateDoctor,
})(DoctorProfileEditor);
