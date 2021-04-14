import React, { Component } from 'react';
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { getAppointmentsByPatientId } from "../../actions/appointmentActions";
import PatientAppointmentCard from "./PatientAppointmentCard";

var noAppointmentsMessage
var futureAppointments = false
var pastAppointments = false

class Dashboard extends Component
{
    async componentDidMount()
    {
        await this.props.getAppointmentsByPatientId(this.props.security.user.userId)
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

                {allAppointments.map(appointment => (
                    
                    (new Date(appointment.date).getTime()) >= (new Date()).getTime() ? (
                        futureAppointments = true) :
                        (pastAppointments = true)
                    
                ))}
                {futureAppointments ? (
                    <h3 className="pl-5 pb-3 font-weight-bold text-center col-12">Your upcoming appointments</h3>) :
                    (<span/>)
                }
            
                
                {noAppointmentsMessage}

                {allAppointments.map(appointment => (
                    
                    (new Date(appointment.date).getTime()) >= (new Date()).getTime() ? (
                        
                            <PatientAppointmentCard key={appointment.appointmentId} appointment={appointment} review = {false}/>
                            ) :
                        (<span/>)
                    
                ))}

                {pastAppointments ? (
                    <h3 className="pl-5 pb-3 pt-4 font-weight-bold text-center col-12">Your past appointments</h3>) :
                    (<span/>)
                }


                {allAppointments.map(appointment => (
                    
                    (new Date(appointment.date).getTime()) <= (new Date()).getTime() ? (
                        <PatientAppointmentCard key={appointment.appointmentId} appointment={appointment} review={true}/>) :
                        (<span/>)
                    
                ))}
                
            </div>
        )
    }
}

Dashboard.propTypes = {
    getAppointmentsByPatientId: PropTypes.func.isRequired,
    appointment: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    appointment: state.appointment,
    security: state.security,
});

export default connect(mapStateToProps, {getAppointmentsByPatientId})(Dashboard);