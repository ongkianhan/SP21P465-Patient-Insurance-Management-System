import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllDoctors, getDoctorsByFilter } from "../../actions/userActions";
import { PropTypes } from "prop-types";
import DoctorCard from "./DoctorCard";
import DoctorCardForPatientView from "./DoctorCardForPatientView";
import classnames from "classnames";
import SpecializationDropdown from "./SpecializationDropdown";

var noDoctorsMessage = null;

//Filter options
var keywords = "";
var specialization = "";
var supportsCovidCare = false;
const NO_SPECIALIZATION_OPTION = "No preference";
const NO_DOCTORS_MESSAGE = (
    <div className="alert alert-info text-center" style={{width: "100%"}}>
        It looks like no doctors could be found...
    </div>
);

class DoctorSearch extends Component {
    constructor()
    {
        super();
        this.state = {
            forceInterfaceUpdate: "" /*Allows us to force a user interface update programmatically*/
        }
    }

    componentDidMount() { //When the component loads (life cycle method)
        this.props.getAllDoctors();

        //Display a message if there are no doctors
        if (this.props.doctor.length === 0) {
            noDoctorsMessage = NO_DOCTORS_MESSAGE;
        }
    }

    //Setter methods for the filter options
    /*setKeywords(input) {
        keywords = input;
    }*///unused
    setSpecialization(input) {
        specialization = input;
    }
    setSupportsCovidCare(e) {
        supportsCovidCare = e.target.checked;
    }

    filterDoctors() {
        //Create a filter request
        var doctorSearchRequest = {
            "keywords": document.querySelector('#searchBar').value,
            "specialization": specialization,
            "supportsCovidCare": supportsCovidCare
        }
        //Remove the specialization if the user did not select one
        if (specialization == NO_SPECIALIZATION_OPTION) {
            doctorSearchRequest["specialization"] = "";
        }

        //Query the database to filter the doctors
        this.props.getDoctorsByFilter(doctorSearchRequest);
    }

    componentDidUpdate()
    {
        //Display a message if there are no doctors
        var {allDoctors} = this.props.doctor;
        if (allDoctors.length == undefined || allDoctors.length < 1) {
            //Show a message stating that there are no doctors.
            noDoctorsMessage = NO_DOCTORS_MESSAGE;
            //Force a user interface update. Use the constant NO_DOCTORS_MESSAGE
            //to prevent infinite calls to componentDidUpdate()
            if (this.state.forceInterfaceUpdate == "")
                this.setState({forceInterfaceUpdate: NO_DOCTORS_MESSAGE})
        }
        else {
            //Retract any message stating that there are no doctors.
            noDoctorsMessage = <span/>;
            //Force a user interface update. Use the constant NO_DOCTORS_MESSAGE
            //to prevent infinite calls to componentDidUpdate()
            if (this.state.forceInterfaceUpdate == NO_DOCTORS_MESSAGE)
                this.setState({forceInterfaceUpdate: ""})
        }
    }

    render() {
        const { allDoctors } = this.props.doctor;

        return (
            <div className="doctorContainer">
                <div className="container">
                    <div className="row">
                        <h1 className="display-4 text-left page-header">
                            Find Doctors
                        </h1>

                        <table>
                            <tr>
                                <td>
                                    <input
                                        placeholder="Search by keywords..."
                                        rows="1"
                                        id="searchBar"
                                        onKeyPress={(e) => {
                                            if (e.key === "Enter")
                                                e.preventDefault();
                                        }}
                                    ></input>
                                </td>
                                <td>
                                    <button
                                        type="submit"
                                        className="button-primary"
                                        id="searchButton"
                                        onClick={this.filterDoctors.bind(this)}
                                    >
                                        Search
                                    </button>
                                </td>
                            </tr>
                        </table>

                        <p style={{margin: "18px 0px 0px 0px"}}>Advanced Search</p>
                        <table className="light-gray-bg" style={{borderRadius: "20px"}}>
                            <td className="text-right">
                                Specialty:
                            </td>
                            <td>
                                <SpecializationDropdown setSpecialization={this.setSpecialization} />
                            </td>
                            <td className="form-check">
                                <input
                                    className={classnames(
                                        "form-check-input"
                                    )}
                                    type="checkbox"
                                    onChange={this.setSupportsCovidCare.bind(this)}
                                    id="supportsCovidCareCheckbox"
                                ></input>
                                <label
                                    className="form-check-label"
                                >
                                    I need COVID-19 care
                                </label>
                            </td>
                        </table>

                        <br />
                        <br />
                        {/* Get the entire list of doctors. For each DoctorCard, set its prop as the doctor data */}
                        {/* Only patients can see relevant options (e.g. a button to schedule an appointment) */}
                        {allDoctors.map((doctor) =>
                            this.props.security.user.userType == "PAT" ? (
                                <DoctorCardForPatientView
                                    key={doctor.id}
                                    doctor={doctor}
                                />
                            ) : (
                                <DoctorCard
                                    key={doctor.id}
                                    doctor={doctor}
                                />
                            )
                        )}
                        
                        {noDoctorsMessage}
                    </div>
                </div>
            </div>
        );
    }
}

//Set up methods to retrieve doctors from the database
DoctorSearch.propTypes = {
    doctor: PropTypes.object.isRequired,
    getAllDoctors: PropTypes.func.isRequired,
    getDoctorsByFilter: PropTypes.func.isRequired,
    security: PropTypes.object.isRequired,
};

//Add the actual doctor state/data to the list of doctors on the page
const mapStateToProps = (state) => ({
    doctor: state.doctor,
    security: state.security
});

export default connect(mapStateToProps, { getAllDoctors, getDoctorsByFilter })(DoctorSearch);