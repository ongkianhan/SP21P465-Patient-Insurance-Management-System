import React, { Component } from 'react'
import { connect } from "react-redux";
import { PropTypes } from "prop-types"
import classnames from "classnames";
import { getDoctor } from "../actions/userActions";
import {createAppointment, validateAppointment} from "../actions/appointmentActions";

class AppointmentScheduler extends Component 
{
    constructor() 
    {
        super();
        this.state = {
            date: "",
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount()
    {
        //Get the doctor id from the URL
        const {userId} = this.props.match.params;
        //Select the doctor from the database again
        this.props.getDoctor(userId, this.props.history);
    }

    componentWillReceiveProps(nextProps) 
    {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onChange(e) 
    {
        //Update the state when the user updates any form field
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e)
    {
        e.preventDefault(); //prevent page refresh
        //Create appointment
        var dateFormat = require("dateformat");
        //var selectedTime = dateFormat(this.state.date, "mm/dd/yyyy h:MM TT");
        //console.log("Scheduling at "+selectedTime);
        var appointment = {
            date: this.state.date,
        } //todo: fix zero indexing of date?
        var doctorId = this.props.doctor.doctor.userId;
    
        //Validate the appointment
        const frontEndErrors = validateAppointment(appointment);
        if (Object.keys(frontEndErrors).length != 0) //if errors exist
        {
            this.setState({ errors: frontEndErrors });
            return;
        }
        alert("Scheduled at "+this.state.date+"!");

        //Send appointment to backend for persistence
        this.props.createAppointment(appointment, doctorId, this.props.history);
    }


    render() {
        const {doctor} = this.props.doctor;

        //Set up the appointment availability table
        var dateFormat = require("dateformat");

        //Inclusive start/stop times that doctors will work between
        const startTimeHours = 8;
        const endTimeHours = 17;
        const minuteDuration = 30;

        const generateAppointmentTable = () => {
            let tableContent = [];
            //Set initial time for the loop
            let time = new Date();
            time.setHours(startTimeHours);
            time.setMinutes(0);
            time.setSeconds(0);
            time.getHours();

            //Push the table header
            let dayOfWeek = dateFormat(time, "dddd, mmmm dS");
            tableContent.push(
                <th className="th-appointment">
                    {dayOfWeek}
                </th>
            );

            //Build a table of available time intervals
            while (time.getHours() < endTimeHours)
            {
                //Push one row onto the table as a time interval (ex: "10:30-11:00")
                let appointmentStartTime = dateFormat(time, "h:MM");
                time.setMinutes(time.getMinutes()+minuteDuration)
                let appointmentEndTime = dateFormat(time+minuteDuration, "h:MM");
                if (time.getHours() == 9) //TODO check if not in doctor's list of appts
                {
                    tableContent.push(
                        <tr>
                            <td className="td-appointment td-appointment-open">
                                {appointmentStartTime}{"-"}{appointmentEndTime}
                            </td>
                        </tr>
                    );
                }
                else
                {
                    tableContent.push(
                        <tr>
                            <td className="td-appointment td-appointment-taken">
                                {appointmentStartTime}{"-"}{appointmentEndTime}
                            </td>
                        </tr>
                    );
                }
            }
            
            return tableContent;
        }
        var tableContent = generateAppointmentTable();
        
 

        const {errors} = this.state;
        return (
            <div className="login">
                <div className="container">
                <h1 className="display-4 text-left page-header">Schedule an Appointment</h1>
                    <form onSubmit={this.onSubmit}>
                        <div className="row align-items-start" style={{marginTop: "calc(10vmin)"}}>
                            <div className="col-md-8">

                                {/* Date/time picker*/}
                                <input type="date"
                                className={classnames("form-control textbox",
                                    {"is-invalid": errors.date})}
                                name="date"
                                value={this.state.date}
                                onChange={this.onChange} />
                                {errors.date && (
                                    <div className="invalid-feedback">{errors.date}</div>
                                )} 
                            
                                {/* Doctor information */}
                                <p className="text-left page-header">Doctor: {doctor.firstName}{" "}{doctor.lastName}</p>
                                <p className="text-left page-header">Date: {this.state.date}</p>
                                <p className="text-left page-header">Time: Not Selected</p>

                                {/*Submit button*/}
                                <div className="row justify-content-center">
                                    <input
                                        type="submit"
                                        className="button-submit button-primary"
                                        value="Make Appointment"
                                    />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <table>
                                    {tableContent}
                                </table>
                            </div>                     
                        </div>
                    </form>
                </div>   
            </div>
        )
    }
}


AppointmentScheduler.propTypes = {
    createAppointment: PropTypes.func.isRequired,
    validateAppointment: PropTypes.func.isRequired,
    doctor: PropTypes.object.isRequired,
    getDoctor: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
} 

//Add the actual doctor state/data to the list of doctors on the page
const mapStateToProps = state => ({
    doctor: state.doctor,
    errors: state.errors
})

export default connect(mapStateToProps, {createAppointment, getDoctor, validateAppointment}) (AppointmentScheduler);