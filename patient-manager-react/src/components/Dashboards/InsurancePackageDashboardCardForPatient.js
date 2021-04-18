import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

class InsurancePackageDashboardCardForPatient extends Component 
{
    constructor(){
        super();
        this.acceptRecommendation = this.acceptRecommendation.bind(this);
        this.declineRecommendation = this.declineRecommendation.bind(this);
    }

    onClickRecommendButton() {
        //Pass package ID to parent component
    }

    acceptRecommendation(e){
        
    }

    declineRecommendation(e){

    }

    render() {
        const insurancePackage = this.props.insurancePackage;
        return (
            <div className="container">
                <div className="card card-body bg-light mb-3">
                    <div className="row align-items-center">
                        <div className="col-7 text-left">
                            <h3>{insurancePackage.packageName}</h3>

                            <h6>Premium: ${insurancePackage.premium}</h6>

                            <h6>Deductible: ${insurancePackage.deductible}</h6>

                            {insurancePackage.copayment > 0 ? (
                                <h6>
                                    Co-payment: ${insurancePackage.copayment}
                                </h6>
                            ) : (
                                <span />
                            )}

                            <h6>
                                Co-insurance:{" "}
                                {insurancePackage.coInsurance * 100.0}%
                            </h6>

                            {insurancePackage.maximumOutOfPocket > 0 ? (
                                <h6>
                                    Max out-of-pocket: $
                                    {insurancePackage.maximumOutOfPocket}
                                </h6>
                            ) : (
                                <span />
                            )}
                        </div>
                        <div class="col-5">
                            <button class="btn btn-success btn-block" onCLick={this.acceptRecommendation}>
                                Accept
                            </button>
                            <button class="btn btn-danger btn-block" onClick={this.declineRecommendation}>
                                Decline
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default InsurancePackageDashboardCardForPatient;
