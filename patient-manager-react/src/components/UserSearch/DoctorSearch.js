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


class DoctorSearch extends Component {
    componentDidMount() { //When the component loads (life cycle method)
        this.props.getAllDoctors();

        //Display a message if there are no doctors
        if (this.props.doctor.length === 0) {
            noDoctorsMessage = (
                <div className="alert alert-info text-center" role="alert">
                    It looks like no doctors could be found...
                </div>
            );
        }
    }

    //Setter methods for the filter options
    setKeywords(input) {
        keywords = input;
    }
    setSpecialization(input) {
        specialization = input;
    }
    setSupportsCovidCare(e) {
        supportsCovidCare = e.checked; //TODO
    }

    filterDoctors() {
        console.log("Filtering!");

        //Create a filter request
        var doctorSearchRequest = {
            keywords: keywords,
            specialization: specialization,
            supportsCovidCare: supportsCovidCare
        }

        //Query the database to filter the doctors
        this.props.getDoctorsByFilter(doctorSearchRequest);
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
                                            else //Trigger an update to the 'keywords' instance var
                                                this.setKeywords(document.querySelector('#searchBar').value);
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
                            <td>
                                Specialty:
                            </td>
                            <td className="td-align-left">
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
                                    Supports COVID-19 Care?
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