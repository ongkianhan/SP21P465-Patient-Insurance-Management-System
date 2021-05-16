import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllPatients } from "../../actions/userActions";
import { PropTypes } from "prop-types";
import PatientCard from "./PatientCard";
import classnames from "classnames";
import SpecializationDropdown from "./SpecializationDropdown";

var noPatientsMessage = null;
const NO_PATIENTS_MESSAGE = (
    <div className="alert alert-info text-center" style={{width: "100%"}}>
        It looks like no patients could be found...
    </div>
);

class PatientSearch extends Component {
    constructor()
    {
        super();
        this.state = {
            forceInterfaceUpdate: "" /*Allows us to force a user interface update programmatically*/
        }
    }

    componentDidMount() { //When the component loads (life cycle method)
        this.props.getAllPatients();

        //Display a message if there are no patients
        if (this.props.patient.length === 0) {
            noPatientsMessage = NO_PATIENTS_MESSAGE;
        }
    }

    componentDidUpdate()
    {
        //Display a message if there are no patients
        var {allPatients} = this.props.patient;
        if (allPatients.length == undefined || allPatients.length < 1) {
            //Show a message stating that there are no patients.
            noPatientsMessage = NO_PATIENTS_MESSAGE;
            //Force a user interface update. Use the constant NO_PATIENTS_MESSAGE
            //to prevent infinite calls to componentDidUpdate()
            if (this.state.forceInterfaceUpdate == "")
                this.setState({forceInterfaceUpdate: NO_PATIENTS_MESSAGE})
        }
        else {
            //Retract any message stating that there are no patients.
            noPatientsMessage = <span/>;
            //Force a user interface update. Use the constant NO_PATIENTS_MESSAGE
            //to prevent infinite calls to componentDidUpdate()
            if (this.state.forceInterfaceUpdate == NO_PATIENTS_MESSAGE)
                this.setState({forceInterfaceUpdate: ""})
        }
    }

    render() {
        const { allPatients } = this.props.patient;

        return (
            <div className="patientContainer">
                <div className="container">
                    <div className="row">
                        <h1 className="display-4 text-left page-header">
                            Find Patients
                        </h1>

                        <br />
                        <br />
                        {/* Get the entire list of patients. For each PatientCard, set its prop as the patient data */}
                        {/* Only patients can see relevant options (e.g. a button to schedule an appointment) */}
                        {allPatients.map((patient) =>
                            <PatientCard
                                key={patient.id}
                                patient={patient}
                            />
                        )}
                        
                        {noPatientsMessage}
                    </div>
                </div>
            </div>
        );
    }
}

//Set up methods to retrieve patients from the database
PatientSearch.propTypes = {
    patient: PropTypes.object.isRequired,
    getAllPatients: PropTypes.func.isRequired,
    security: PropTypes.object.isRequired,
};

//Add the actual patient state/data to the list of patients on the page
const mapStateToProps = (state) => ({
    patient: state.patient,
    security: state.security
});

export default connect(mapStateToProps, { getAllPatients })(PatientSearch);