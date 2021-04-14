import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

class PatientAppointmentCard extends Component {
    render() {
        let date = new Date(this.props.appointment.date);
        date = date.toString();
        date = date.slice(0, 21);
        let AMorPM;
        if (parseInt(date.slice(15, 18)) >= 12) {
            AMorPM = "PM";
        } else {
            AMorPM = "AM";
        }

        if (parseInt(date.slice(15, 18)) >= 13) {
            date =
                date.slice(0, 15) +
                " " +
                (parseInt(date.slice(15, 18)) - 12).toString() +
                date.slice(18, 21);
        }
        const { appointment } = this.props;
        return (
            <div className="container">
                <div className="card card-body bg-light">
                    <div className="row align-items-center">
                        <div className="col-8 text-left">
                            <h1 className="font-weight-bold">
                                {appointment.doctor.firstName}{" "}
                                {appointment.doctor.lastName}
                            </h1>
                            <h3>
                                {date} {AMorPM}
                            </h3>
                            <h3>{appointment.doctor.hospitalName}</h3>
                            {/*<h5>Age: {appointment.patient.age}</h5>*/}
                            <p></p>
                        </div>
                        <div className="col-4">
                            <Link
                                to={{
                                    pathname: `/view-map/`,
                                    latitude: appointment.doctor.latitude,
                                    longitude: appointment.doctor.longitude,
                                }}
                            >
                                <button className="col my-1 btn btn-primary card-button">
                                    Show Directions
                                </button>
                            </Link>
                            <Link to={`/account/${appointment.doctor.userId}`}>
                                <button className="col my-1 btn btn-info card-button">
                                    View Doctor
                                </button>
                            </Link>
                            {this.props.review ? (
                                <Link to="">
                                    <button className="col my-1 btn btn-secondary card-button">
                                        Write Review
                                    </button>
                                </Link>
                            ) : (
                                <span />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PatientAppointmentCard;
