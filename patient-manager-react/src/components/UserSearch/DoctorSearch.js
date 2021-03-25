import React, { Component } from 'react'
import { connect } from "react-redux";
import { getAllDoctors } from "../../actions/userActions";
import { PropTypes } from "prop-types";
import DoctorCard from "./DoctorCard";
import classnames from "classnames";

var noDoctorsMessage = null;

class DoctorSearch extends Component 
{
    componentDidMount() //When the component loads (life cycle method)
    {
        this.props.getAllDoctors();

        //Display a message if there are no doctors
        if (this.props.doctor.length === 0)
        {
            noDoctorsMessage = (
                <div className="alert alert-info text-center" role="alert">
                    It looks like no doctors could be found...
                </div>
            )
        }
    }

    render() {
        const {allDoctors} = this.props.doctor;

        return (
            <div className="doctorContainer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-left page-header">Find Doctors</h1>
                            
                            <div className="row align-items-center">
                                <div className="col-10">
                                    <input 
                                    className={classnames("form-control")}
                                    placeholder="Search by keywords..."
                                    rows="1"
                                    onKeyPress={e => {
                                        if(e.key === 'Enter')
                                            e.preventDefault()
                                        }}
                                    ></input>
                                </div>
                                <div className="col-2 justify-content-end">
                                    <button type="submit" className="button-card button-primary">
                                        Search
                                    </button>
                                </div>
                            </div>

                            <br />
                            
                            <br />
                            {/* Get the entire list of doctors. For each DoctorCard, set its prop as the doctor data */}
                            {allDoctors.map(doctor => (
                                <DoctorCard key={doctor.id} doctor={doctor} />
                            ))}
                            {noDoctorsMessage}
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