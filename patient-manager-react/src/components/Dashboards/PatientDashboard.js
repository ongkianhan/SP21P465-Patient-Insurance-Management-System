import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { getAppointmentsByPatientId } from "../../actions/appointmentActions";
import PatientAppointmentCard from "./PatientAppointmentCard";
import { getInsurancePackagesByPatientId, acceptInsurancePackageRecommendation, declineInsurancePackageRecommendation } from "../../actions/insurancePackageActions";
import InsurancePackageDashboardCardForPatient from "./InsurancePackageDashboardCardForPatient";

var noAppointmentsMessage;
var futureAppointments = false;
var pastAppointments = false;
var recommendedPackagesMessage = false;
var heldPackagesMessage = true;

class Dashboard extends Component 
{
    constructor() {
        super();
    }

    async componentDidMount() {
        await this.props.getAppointmentsByPatientId(
            this.props.security.user.userId
        );
        await this.props.getInsurancePackagesByPatientId(
            this.props.security.user.userId
        );
    }

    render() {
        const { allPackages } = this.props.insurancePackage;

        if (this.props.appointment.allAppointments.length === 0) {
            noAppointmentsMessage = (
                <div
                    className="container pl-5"
                    style={{ width: "100vh", height: "15vh" }}
                >
                    <div className="card card-body bg-light">
                        <h4>No upcoming appointments</h4>
                    </div>
                </div>
            );
        } else {
            noAppointmentsMessage = <span />;
        }

        const { allAppointments } = this.props.appointment;

        return (
            <div className="container-fluid">
                <div className="row align-center">
                    <div className="col-6 align-center">

                        {/* Determine what headers should be placed */}
                        {allAppointments.map((appointment) =>
                            new Date(appointment.date).getTime() >=
                            new Date().getTime()
                                ? (futureAppointments = true)
                                : (pastAppointments = true)
                        )}
                        {allPackages.map((insurancePackage) =>
                            insurancePackage.recommendation == true
                                ? (recommendedPackagesMessage = true)
                                : (heldPackagesMessage = true)
                        )}

                        {/* Upcoming appointment cards */}
                        {futureAppointments ? (
                            <h3 className="pl-5 pb-3 font-weight-bold text-center col-12">
                                Your upcoming appointments
                            </h3>
                        ) : (
                            <span />
                        )}
                        {noAppointmentsMessage}
                        {allAppointments.map((appointment) =>
                            new Date(appointment.date).getTime() >=
                            new Date().getTime() ? (
                                <PatientAppointmentCard
                                    key={appointment.appointmentId}
                                    appointment={appointment}
                                    review={false}
                                />
                            ) : (
                                <span />
                            )
                        )}
                        
                        {/* Recommended insurance cards */}
                        <h3 className="pl-5 pb-3 font-weight-bold text-center col-12">
                            Recommended Insurance Packages
                        </h3>
                        {allPackages.map((insurancePackage) => (
                            insurancePackage.recommendation == false ? (
                            <InsurancePackageDashboardCardForPatient
                                makeInsuranceRecommendation={
                                    this.makeInsuranceRecommendation
                                }
                                key={insurancePackage.insurancePackageId}
                                insurancePackage={insurancePackage}
                            />) : ( <span/> )
                        ))}

                        {/* Held insurance cards */}
                        <h3 className="pl-5 pb-3 font-weight-bold text-center col-12">
                            Your Insurance Packages
                        </h3>
                        {allPackages.map((insurancePackage) => (
                            insurancePackage.recommendation == true ? (
                            <InsurancePackageDashboardCardForPatient
                                makeInsuranceRecommendation={
                                    this.makeInsuranceRecommendation
                                }
                                key={insurancePackage.insurancePackageId}
                                insurancePackage={insurancePackage}
                                acceptInsurancePackageRecommendation={acceptInsurancePackageRecommendation}
                                declineInsurancePackageRecommendation={declineInsurancePackageRecommendation}
                            />) : ( <span/> )
                        ))}

                        {/* Past appointments cards */}
                        {pastAppointments ? (
                            <h3 className="pl-5 pb-3 pt-4 font-weight-bold text-center col-12">
                                Your past appointments
                            </h3>
                        ) : (
                            <span />
                        )}
                        {allAppointments.map((appointment) =>
                            new Date(appointment.date).getTime() <= new Date().getTime() ? (
                                <PatientAppointmentCard
                                    key={appointment.appointmentId}
                                    appointment={appointment}
                                    review={true}
                                />
                            ) : (
                                <span />
                            )
                        )}
                    </div>
                    <div classname="col-12 align-center">
                        
                    </div>
                    <div classname="col-12 align-center">
                        
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    getAppointmentsByPatientId: PropTypes.func.isRequired,
    appointment: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired,
    insurancePackage: PropTypes.object.isRequired,
    acceptInsurancePackageRecommendation: PropTypes.func.isRequired,
    declineInsurancePackageRecommendation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    insurancePackage: state.insurancePackage,
    appointment: state.appointment,
    security: state.security,
});

export default connect(mapStateToProps, {
    getAppointmentsByPatientId,
    getInsurancePackagesByPatientId,
    acceptInsurancePackageRecommendation,
    declineInsurancePackageRecommendation,
})(Dashboard);
