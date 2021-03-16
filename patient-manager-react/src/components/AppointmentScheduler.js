import React, { Component } from 'react'
import { connect } from "react-redux";
import { getDoctor } from "../actions/userActions";
import { PropTypes } from "prop-types"
import DateTimePicker from 'react-datetime-picker';

class AppointmentScheduler extends Component 
{
    constructor() {
        super();
        this.state = {
            errors: {}
        };
    }

    componentDidMount() {
        const { userId } = this.props.match.params;
        //this.props.getBacklog(id);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
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
            for ( ; time.getHours() < endTimeHours; )
            {
                //Push one row onto the table as a time interval (ex: "10:30-11:00")
                let appointmentStartTime = dateFormat(time, "h:MM");
                time.setMinutes(time.getMinutes()+minuteDuration)
                let appointmentEndTime = dateFormat(time+minuteDuration, "h:MM");
                if (time.getHours() == 9)
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
        
 

        return (
            <div className="login">
                <div className="container">
                <h1 className="display-4 text-left page-header">Schedule an Appointment</h1>
                    <div className="row align-items-start" style={{marginTop: "calc(10vmin)"}}>
                        <div className="col-md-8">

                            {/* Date/time picker https://www.npmjs.com/package/react-time-picker*/}
                            Select a date and time: &nbsp;
                            <DateTimePicker
                            />
                        
                            {/* Doctor information */}
                            <p className="text-left page-header">Doctor: Tom Campbell</p>
                            <p className="text-left page-header">{doctor.firstName}{" "}{doctor.lastName}</p>
                            <p className="text-left page-header">Date: Not Selected</p>
                            <p className="text-left page-header">Time: Not Selected</p>
                        </div>
                        <div className="col-md-4">
                            <table>
                                {tableContent}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


AppointmentScheduler.propTypes = {
    doctor: PropTypes.object.isRequired,
    getDoctor: PropTypes.func.isRequired
} 

//Add the actual doctor state/data to the list of doctors on the page
const mapStateToProps = state => ({
    doctor: state.doctor
})

export default connect(mapStateToProps, {getDoctor}) (AppointmentScheduler);