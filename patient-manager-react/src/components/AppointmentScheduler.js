import React, { Component } from 'react'
import { connect } from "react-redux";
import { PropTypes } from "prop-types"
import classnames from "classnames";
import { getDoctor } from "../actions/userActions";
import {createAppointment, getAppointmentsByDoctorId, validateAppointment} from "../actions/appointmentActions";
import SuccessPopup from './SuccessPopup';

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
            date: "",
            time: new Date(),
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
        this.generateAppointmentTable(this.state.time);
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

            //Show a new appointment table based on the target date
            this.generateAppointmentTable(selectedDate);
        }
    }

    onSubmit(e)
    {
        e.preventDefault(); //prevent page refresh
        //Create appointment`
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

        //Send appointment to backend for persistence
        this.props.createAppointment(appointment, doctorId, this.props.history);

        //Show success popup message
        this.successPopup.current.show();

    }

    convertDateUsingTimezone(date) {
        return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: "America/New_York"}));   
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

        //Prepare a filter for which appts are open
        for (var i = 0; i < allAppointments.length; i++)
        {
            //console.log("Taken time: "+this.convertDateUsingTimezone(new Date(allAppointments[i].date), "America/New_York"));
            console.log("Not available time "+i+": "+new Date(allAppointments[i].date).getTime());
        }

        //Build a table of available time intervals
        while (time.getHours() < endTimeHours)
        {
            //Push one row onto the table as a time interval (ex: "10:30-11:00")
            let appointmentStartTime = dateFormat(time, "h:MM");
            time.setMinutes(time.getMinutes()+minuteDuration)
            let appointmentEndTime = dateFormat(time, "h:MM");
            console.log("Comparing "+time.getTime());
            //console.log("Displaying value for:" + allAppointments[time.getTime()]);
            if (allAppointments[time.getTime()] == undefined) //check if appt is not taken
            {
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
        }
        console.log("---");
        
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
        this.setState({time: selectedTime, formattedTime: formmattedTime});
    }


    render() {
        const {doctor} = this.props.doctor;
        const {userId} = this.props.match.params;  //Get the doctor id from the URL
        const {errors} = this.state;
        
        return (
            <div>
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
                                onChange={this.onChange}
                                id="datePicker" />
                                {errors.date && (
                                    <div className="invalid-feedback">{errors.date}</div>
                                )} 
                            
                                {/* Doctor information */}
                                <p className="text-left page-header">Doctor: {doctor.firstName}{" "}{doctor.lastName}</p>
                                <p className="text-left page-header">Date: {this.state.formattedDate}</p>
                                <p className="text-left page-header">Time: {this.state.formattedTime}</p>

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
                    
                    <SuccessPopup ref={this.successPopup} content="Appointment scheduled!"/>
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