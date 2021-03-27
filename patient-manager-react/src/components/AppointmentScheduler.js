import React, { Component } from 'react'
import { connect } from "react-redux";
import { PropTypes } from "prop-types"
import classnames from "classnames";
import { getDoctor } from "../actions/userActions";
import {createAppointment, getAppointmentsByDoctorId, validateAppointment} from "../actions/appointmentActions";
import CustomPopup from './CustomPopup';

var dateFormat = require("dateformat");
//Inclusive start/stop times that doctors will work between
const startTimeHours = 8;
const endTimeHours = 17;
const minuteDuration = 30;

class AppointmentScheduler extends Component 
{
    constructor() 
    {
        super();
        this.state = {
            date: "", /* Stores the month, day, and year temporarily */
            time: null, /* Stores the actual date and time selection */ 
            formattedDate: dateFormat(new Date(), "mm/dd/yyyy"),
            formattedTime: "Not Selected",
            appointmentTable: <span>Loading appointments...</span>,
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.successPopup = React.createRef();
    }

    componentDidMount()
    {
        //Get the doctor id from the URL
        const {userId} = this.props.match.params;
        //Select the doctor from the database again
        this.props.getDoctor(userId, this.props.history);

        //Get the doctor's current list of appointments to find which are taken
        this.props.getAppointmentsByDoctorId(userId);
        this.generateAppointmentTable(new Date());
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
        if (e.target.name === "date")
        {
            //Get the date object from the input element
            var selectedDate = document.querySelector('#datePicker').valueAsDate;
            selectedDate.setDate(selectedDate.getDate()+1); //fix strange behavior of date picker
            
            //Update the date text field
            var formattedDate = dateFormat(selectedDate, "mm/dd/yyyy");
            this.setState({formattedDate: formattedDate})

            //Update the selected date/time for the appointment in the state
            var time = this.state.time;
            if (time != null)
            {
                time.setFullYear(selectedDate.getFullYear());
                time.setMonth(selectedDate.getMonth());
                time.setDate(selectedDate.getDate());
            }

            //Show a new appointment table based on the target date
            this.generateAppointmentTable(selectedDate);
        }
    }

    onSubmit(e)
    {
        e.preventDefault(); //prevent page refresh
        //Create appointment
        var appointment = {
            date: this.state.time,
        }
        var doctorId = this.props.doctor.doctor.userId;
    
        //Validate the appointment
        const frontEndErrors = validateAppointment(appointment);
        if (Object.keys(frontEndErrors).length != 0) //if errors exist
        {
            this.setState({ errors: frontEndErrors });
            return;
        }

        //Send appointment to backend for persistence
        this.props.createAppointment(appointment, doctorId, this.props.history);

        //Show success popup message
        this.successPopup.current.setContent(
            "Appointment successfully scheduled with "+this.props.doctor.doctor.firstName+" "+this.props.doctor.doctor.lastName+" on "+this.state.formattedDate+
            " at "+this.state.formattedTime);
        this.successPopup.current.show();
    }

    
    generateAppointmentTable = (selectedDate) => {
        const {allAppointments} = this.props.appointment;
        
        //Set up the appointment availability table
        var dateFormat = require("dateformat");
        
        let tableContent = [];
        //Set initial time for the loop
        let time = selectedDate;
        time.setHours(startTimeHours);
        time.setMinutes(0);
        time.setSeconds(0);
        time.setMilliseconds(0);

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
            //Push one row onto the table as a time interval (ex: "10:30-11:00")...
            //First, prepare formatted start and stop times
            let appointmentStartTime = dateFormat(time, "h:MM");
            time.setMinutes(time.getMinutes()+minuteDuration);
            let appointmentEndTime = dateFormat(time, "h:MM");
            time.setMinutes(time.getMinutes()-minuteDuration);
            
            //Check all taken appointments against this time slot.
            //If it matches one of the taken times, mark it as not available.
            var isAvailable = true;
            for (var i = 0; i < allAppointments.length; i++)
            {
                if (new Date(allAppointments[i].date).getTime() == time.getTime())
                {
                    isAvailable = false;
                    i = allAppointments.length; //end loop
                }
            }
            
            if (isAvailable)
            {
                //Add a new open time slot to the table.
                //Note that the data-value field holds the end time in milliseconds.
                //..which is send to handleSelectTime() when the <td> is clicked.
                tableContent.push(
                    <tr>
                        <td onClick={this.handleSelectTime.bind(this)} data-value={(time).getTime()} className="td-appointment td-appointment-open">
                            <span className="tooltip-text tooltip-text-left">Open</span>
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
                            <span className="tooltip-text tooltip-text-left">Closed</span>
                            {appointmentStartTime}{"-"}{appointmentEndTime}
                        </td>
                    </tr>
                );
            }
            //Increment the time
            time.setMinutes(time.getMinutes()+minuteDuration);
        }
        
        this.setState({ appointmentTable: tableContent });
    }

    handleSelectTime(event) 
    {
        //Get the UTC millisecond time selected and make it into a Date object
        const selectedTime = event.currentTarget.getAttribute("data-value");
        const selectedTimeObject = new Date();
        selectedTimeObject.setTime(selectedTime);
        
        //Format the time
        const formmattedTime = dateFormat(selectedTimeObject, "h:MM TT");
        //Display the formatted time
        this.setState({time: selectedTimeObject, formattedTime: formmattedTime});
    }


    render() {
        const {doctor} = this.props.doctor;
        const {userId} = this.props.match.params;  //Get the doctor id from the URL
        const {errors} = this.state;
        
        return (
            <div>
                <div className="container">
                <h1 className="display-5 text-left page-header">Schedule an Appointment</h1>
                    <form onSubmit={this.onSubmit}>
                        <div className="row align-items-start" style={{marginTop: "calc(4vmin)"}}>
                            <div className="col-md-8">

                                {/* Date/time picker*/}
                                <p className="text-left page-header">Select a date for your appointment...</p>
                                <input type="date"
                                className={classnames("form-control textbox",
                                    {"is-invalid": errors.date})}
                                name="date"
                                value={this.state.date}
                                onChange={this.onChange}
                                id="datePicker" />
                                {errors.date && (
                                    <div className="invalid-feedback">{errors.date}</div>
                                )} 
                            
                                {/* Doctor information */}
                                <div className="thin-container" style={{marginTop: "1.5em"}}>
                                    <p className="thin-container-title text-center">Appointment Summary</p>
                                    <p className="text-left paragraph">Doctor: {doctor.firstName}{" "}{doctor.lastName}</p>
                                    <p className="text-left paragraph">Date: {this.state.formattedDate}</p>
                                    <p className="text-left paragraph">Time: {this.state.formattedTime}</p>
                                    <p className="text-left paragraph">Hospital: {doctor.hospitalName}</p>
                                </div>

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
                                    {this.state.appointmentTable}
                                </table>
                            </div>
                        </div>
                    </form>
                    
                    <CustomPopup ref={this.successPopup} redirect="/dashboard" headerText="Success" content="Appointment scheduled!"/>
                </div>   
            </div>
        )
    }
}


AppointmentScheduler.propTypes = {
    createAppointment: PropTypes.func.isRequired,
    getAppointmentsByDoctorId: PropTypes.func.isRequired,
    validateAppointment: PropTypes.func.isRequired,
    getDoctor: PropTypes.func.isRequired,
    appointment: PropTypes.object.isRequired,
    doctor: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
} 

//Add the actual doctor state/data to the list of doctors on the page
const mapStateToProps = state => ({
    appointment: state.appointment,
    doctor: state.doctor,
    errors: state.errors
})

export default connect(mapStateToProps, {createAppointment, getAppointmentsByDoctorId, getDoctor, validateAppointment}) (AppointmentScheduler);