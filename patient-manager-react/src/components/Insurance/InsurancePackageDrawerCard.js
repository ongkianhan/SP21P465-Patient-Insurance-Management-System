import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

class InsurancePackageDrawerCard extends Component 
{
    onClickRecommendButton() {
        //Pass package ID to parent component
        this.props.makeInsuranceRecommendation(this.props.insurancePackage.insurancePackageId);
    }

    render() {
        const insurancePackage = this.props.insurancePackage;
        return (
            <div>
                <div className="card card-body bg-light mb-3">
                    <div className="row align-items-center">
                        <div className="col-12 text-left">
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
                    </div>

                    <div className="row align-items-center">
                        <div className="col">
                            <button className="col my-1 button-secondary card-button" onClick={this.onClickRecommendButton.bind(this)}>
                                Recommend Insurance
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default InsurancePackageDrawerCard;
