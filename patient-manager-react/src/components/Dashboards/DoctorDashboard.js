import React, { Component } from 'react';
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { getAppointmentsByDoctorId } from "../../actions/appointmentActions";
import DoctorAppointmentCard from "./DoctorAppointmentCard";
import CovidArticles from "./CovidArticles"

var noAppointmentsMessage

class Dashboard extends Component
{

    async componentDidMount() //When the component loads (life cycle method)
    {
        //const {userId} = this.props.match.params;
        await this.props.getAppointmentsByDoctorId(this.props.security.user.userId)

        
        //Display a message if there are no appointments
    }

    constructor()
    {
        super();
    }

    render() {

        if (this.props.appointment.allAppointments.length===0)
        {
            noAppointmentsMessage = (
                <div className="container pl-5" style = {{width:'100vh', height:'15vh'}}>
                    <div className="card card-body bg-light">
                        <h4>No upcoming appointments</h4>
                    </div>
                </div>
            )
        }
        else{
            noAppointmentsMessage = (<span/>)
        }
       
        const {allAppointments} = this.props.appointment
        return (
            <div className="container row col-12 align-center">
                <h3 className="pl-5 pb-3 font-weight-bold text-center col-12">Your upcoming appointments</h3>
                {/*this.props.security.user.userType*/}
                
                {noAppointmentsMessage}

                {allAppointments.map(appointment => (
                    <DoctorAppointmentCard key={appointment.appointmentId} appointment={appointment}/>
                ))}
                
                {/*allAppointments.map(appointment => (<DoctorAppointmentCard key={appointment.id} appointment={appointment}/>))*/}


                <div>
                    <CovidArticles/>
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    getAppointmentsByDoctorId: PropTypes.func.isRequired,
    appointment: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    appointment: state.appointment,
    security: state.security
});

export default connect(mapStateToProps, {getAppointmentsByDoctorId})(Dashboard);