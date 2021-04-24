import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

class InsurancePackageDashboardCardForPatient extends Component 
{
    render()
    {
        const insurancePackage = this.props.insurancePackage;

        return (
            <div className="container">
                <div className="card card-body bg-light mb-3">
                    <div className="row align-items-center">
                        <div className="col-12 text-left">
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
                    </div>
                </div>
            </div>
        );
    }
}

export default InsurancePackageDashboardCardForPatient;
