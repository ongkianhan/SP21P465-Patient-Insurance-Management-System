import React, { Component } from 'react'
import { connect } from "react-redux";
import { getAllDoctors } from "../../actions/userActions";
import { PropTypes } from "prop-types"
import DoctorCard from "./DoctorCard";

class DoctorSearch extends Component 
{
    componentDidMount() //When the component loads (life cycle method)
    {
        this.props.getAllDoctors();
    }

    render() {
        const {allDoctors} = this.props.doctor;

        return (
            <div className="doctorContainer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Doctors</h1>
                            <br />
                            
                            <br />
                            <hr />
                            {/* Get the entire list of doctors. For each DoctorCard, set its prop as the doctor data */}
                            {allDoctors.map(doctor => (
                                <DoctorCard key={doctor.id} doctor={doctor} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


//Set up methods to retrieve doctors from the database
DoctorSearch.propTypes = {
    doctor: PropTypes.object.isRequired,
    getAllDoctors: PropTypes.func.isRequired
} 

//Add the actual doctor state/data to the list of doctors on the page
const mapStateToProps = state => ({
    doctor: state.doctor
})

export default connect(mapStateToProps, {getAllDoctors}) (DoctorSearch);