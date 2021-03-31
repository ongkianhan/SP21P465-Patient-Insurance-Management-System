import React, { Component } from 'react';
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { getAppointmentsByDoctorId } from "../../actions/appointmentActions";
import DoctorAppointmentCard from "../DoctorAppointmentCard";

var noAppointmentsMessage

class Dashboard extends Component
{

    async componentDidMount() //When the component loads (life cycle method)
    {
        //const {userId} = this.props.match.params;
        await this.props.getAppointmentsByDoctorId(this.props.security.user.userId)

        
        //Display a message if there are no appointments
        console.log(this.props.appointment)
        console.log(this.props.appointment.allAppointments)
        if (this.props.appointment.length===0)
        {
            noAppointmentsMessage = (
                <div className="alert alert-info text-center" role="alert">
                    It looks like no appointments could be found...
                </div>
            )
        }
        else{
            noAppointmentsMessage = (<span/>)
        }
    }

    constructor()
    {
        super();
    }

    render() {
       
        const {allAppointments} = this.props.appointment
        return (
            <div>
                <h3 className="pl-5 text-left pb-2">Your upcoming appointments</h3>
                {/*this.props.security.user.userType*/}
                
                {noAppointmentsMessage}

                {allAppointments.map(appointment => (
                    <DoctorAppointmentCard key={appointment.appointmentId} appointment={appointment}/>
                ))}
                
                {/*allAppointments.map(appointment => (<DoctorAppointmentCard key={appointment.id} appointment={appointment}/>))*/}


                
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