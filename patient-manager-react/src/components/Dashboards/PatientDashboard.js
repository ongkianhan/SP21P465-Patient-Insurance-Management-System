import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { getAppointmentsByPatientId } from "../../actions/appointmentActions";
import PatientAppointmentCard from "./PatientAppointmentCard";
import { getInsurancePackagesByPatientId, acceptInsurancePackageRecommendation, declineInsurancePackageRecommendation } from "../../actions/insurancePackageActions";
import InsurancePackageDashboardCardForPatient from "./InsurancePackageDashboardCardForPatient";
import InsuranceRecommendationDashboardCardForPatient from "./InsuranceRecommendationDashboardCardForPatient";
import CovidArticles from "./CovidArticles"

var noAppointmentsMessage;
var futureAppointments = false;
var pastAppointments = false;
var recommendedPackagesMessage = false;
var heldPackagesMessage = true;

class PatientDashboard extends Component 
{
    constructor() {
        super();
        this.acceptRecommendation = this.acceptRecommendation.bind(this);
        this.declineRecommendation = this.declineRecommendation.bind(this);
    }

    async componentDidMount() {
        await this.props.getAppointmentsByPatientId(
            this.props.security.user.userId
        );
        await this.props.getInsurancePackagesByPatientId(
            this.props.security.user.userId
        );
    }

    acceptRecommendation(insurancePackageId) {
        this.props.acceptInsurancePackageRecommendation(insurancePackageId);
        this.componentDidMount();
        
    }

    declineRecommendation(insurancePackageId) {
        this.props.declineInsurancePackageRecommendation(insurancePackageId);
        this.componentDidMount();
    }

    render() {
        var { allPackages } = this.props.insurancePackage;
        recommendedPackagesMessage = false;

        if (this.props.appointment.allAppointments.length === 0) 
        {
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
        } 
        else
        {
            noAppointmentsMessage = <span />;
        }

        const { allAppointments } = this.props.appointment;

        return (
            <div className="container-fluid align-center">
                <div className="row">
                    <div className="col-9 align-center">

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
                        {recommendedPackagesMessage ? (<h3 className="pl-5 pt-3 pb-3 font-weight-bold text-center">
                            Recommended Insurance Packages
                        </h3>) : (<span/>)
                        }
                        {allPackages.map((insurancePackage) => (
                            insurancePackage.recommendation == true ? (
                            <InsuranceRecommendationDashboardCardForPatient
                                key={insurancePackage.recommendation}
                                insurancePackage={insurancePackage}
                                acceptRecommendation={this.acceptRecommendation}
                                declineRecommendation={this.declineRecommendation}
                            />) : ( <span/> )
                        ))}

                        {/* Held insurance cards */}
                        <h3 className="pl-5 pt-3 pb-3 font-weight-bold text-center">
                            Your Insurance Packages
                        </h3>
                        {allPackages.map((insurancePackage) => (
                            insurancePackage.recommendation == false ? (
                            <InsurancePackageDashboardCardForPatient
                                key={insurancePackage.insurancePackageId}
                                insurancePackage={insurancePackage}
                            />) : ( <span/> )
                        ))}

                        {/* Past appointments cards */}
                        {pastAppointments ? (
                            <h3 className="pl-5 pb-3 pt-3 font-weight-bold text-center ">
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
                    <div class="col-3 text-left pr-5 container-fluid">
                        <h5 class="row">Recent CDC Articles</h5>
                        <div class ="row"><CovidArticles index={0}/></div>
                        <div class ="row"><CovidArticles index={1}/></div>
                        <div class ="row"><CovidArticles index={2}/></div>
                        <div class ="row"><CovidArticles index={3}/></div>
                        <div class ="row"><CovidArticles index={4}/></div>
                    </div>
                    
                </div>
                
            </div>
        );
    }
}

PatientDashboard.propTypes = {
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
})(PatientDashboard);
