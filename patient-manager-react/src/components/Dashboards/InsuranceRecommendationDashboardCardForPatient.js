import React, { Component } from "react";

class InsuranceRecommendationDashboardCardForPatient extends Component 
{
    constructor(){
        super();
        this.onClickAcceptRecommendation = this.onClickAcceptRecommendation.bind(this);
        this.onClickDeclineRecommendation = this.onClickDeclineRecommendation.bind(this);
    }

    onClickAcceptRecommendation()
    {
        //Call the ACCEPT method in the parent component
        this.props.acceptRecommendation(this.props.insurancePackage.insurancePackageId);
    }

    onClickDeclineRecommendation()
    {
        //Call the DECLINE method in the parent component
        this.props.declineRecommendation(this.props.insurancePackage.insurancePackageId);
    }

    render() {
        const insurancePackage = this.props.insurancePackage;
        return (
            <div className="container">
                <div className="card card-body bg-light mb-3">
                    <div className="row align-items-center">
                        <div className="col-7 text-left">
                            <h3>{insurancePackage.packageName}</h3>

                            <h6>
                                <b>
                                    ${insurancePackage.premium}
                                </b>
                                {" "}premium
                            </h6>

                            <h6>
                                <b>
                                    ${insurancePackage.deductible}
                                </b>
                                {" "}deductible
                            </h6>

                            {insurancePackage.copayment > 0 ? (
                                <h6>
                                    <b>
                                        ${insurancePackage.copayment}
                                    </b>
                                    {" "}co-payment
                                </h6>
                            ) : (
                                <span />
                            )}

                            {insurancePackage.coInsurance > 0 ? (
                                <h6>
                                    <b>
                                        {insurancePackage.coInsurance * 100.0}%
                                    </b>
                                    {" "}co-insurance
                                </h6>
                            ) : (
                                <span />
                            )}

                            {insurancePackage.maximumOutOfPocket > 0 ? (
                                <h6>
                                    <b>
                                        ${insurancePackage.maximumOutOfPocket}
                                    </b>
                                    {" "}max out-of-pocket
                                </h6>
                            ) : (
                                <span />
                            )}

                            Provided by {insurancePackage.firmName}
                        </div>
                        <div className="col-5">
                            <button className="btn btn-success btn-block" onClick={this.onClickAcceptRecommendation}>
                                Accept
                            </button>
                            <button className="btn btn-danger btn-block" onClick={this.onClickDeclineRecommendation}>
                                Decline
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default InsuranceRecommendationDashboardCardForPatient;
