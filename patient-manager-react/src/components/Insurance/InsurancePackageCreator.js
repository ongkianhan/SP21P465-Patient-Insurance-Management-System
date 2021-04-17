import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { createInsurancePackage } from "../../actions/insurancePackageActions";
import { Link } from "react-router-dom";
import { validateInsurancePackage, putDefaultValuesInInsurancePackage } from "../../validation/packageValidator";

class InsurancePackageCreator extends Component {
    constructor() {
        super();

        this.state = {
            packageName: "",
            packageDetails: "",
            premium: "",
            deductible: "",
            copayment: "",
            coInsurance: "",
            maximumOutOfPocket: "",
            errors: {},
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {}

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    //When submitting, create the insurance
    async onSubmit(e) {
        e.preventDefault();
        //Create a new insurance package object
        var newPackage = {
            packageName: this.state.packageName,
            packageDetails: this.state.packageDetails,
            premium: this.state.premium,
            deductible: this.state.deductible,
            copayment: this.state.copayment,
            coInsurance: this.state.coInsurance,
            maximumOutOfPocket: this.state.maximumOutOfPocket,
            errors: {},
        };

        //Validate the package
        const frontEndErrors = validateInsurancePackage(newPackage);
        if (Object.keys(frontEndErrors).length != 0) {
            //if errors exist
            this.setState({ errors: frontEndErrors });
            return;
        }

        //Add default values for blank fields
        newPackage = putDefaultValuesInInsurancePackage(newPackage);

        //Send the creation request
        await this.props.createInsurancePackage(
            newPackage,
            this.props.history
        );

        //If no errors exist
        if (Object.keys(this.state.errors).length == 0) 
        {
            //Navigate to the dashboard
            this.props.history.push("/dashboard");
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {/*Header*/}
                            <div
                                className="text-left"
                                style={{ paddingTop: "2%" }}
                            >
                                <Link to="/dashboard" style={{ color: "Green" }}>
                                    <strong
                                        style={{ fontFamily: "Titillium Web" }}
                                    >
                                        &lt; Go back to dashboard
                                    </strong>
                                </Link>
                            </div>
                            <h1 className="display-4 text-left page-header">
                                Create an insurance package
                            </h1>

                            <div className="thin-container">
                                <p className="thin-container-title text-center">
                                    <b>Create Insurance</b>
                                </p>
                                <p className="text-center">
                                    Leave fields blank if they do not apply
                                </p>
                                <p stlye={{ fontSize: "6px" }}></p>

                                <form onSubmit={this.onSubmit}>
                                    {/*Column 1*/}
                                    <table>
                                        {/*Row 1*/}
                                        <tr>
                                            <td className="td-textbox-holder">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className={classnames(
                                                            "form-control textbox",
                                                            {
                                                                "is-invalid":
                                                                    errors.packageName,
                                                            }
                                                        )}
                                                        placeholder="Name of insurance package"
                                                        name="packageName"
                                                        value={
                                                            this.state.packageName
                                                        }
                                                        onChange={this.onChange}
                                                    />
                                                    {errors.packageName && (
                                                        <div className="invalid-feedback">
                                                            {errors.packageName}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="td-textbox-holder">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className={classnames(
                                                            "form-control textbox",
                                                            {
                                                                "is-invalid":
                                                                    errors.premium,
                                                            }
                                                        )}
                                                        placeholder="Monthly Premium"
                                                        name="premium"
                                                        value={
                                                            this.state.premium
                                                        }
                                                        onChange={this.onChange}
                                                    />
                                                    {errors.premium && (
                                                        <div className="invalid-feedback">
                                                            {errors.premium}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                        {/*Row 2*/}
                                        <tr>
                                            <td className="td-textbox-holder">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className={classnames(
                                                            "form-control textbox",
                                                            {
                                                                "is-invalid":
                                                                    errors.deductible,
                                                            }
                                                        )}
                                                        placeholder="Deductible"
                                                        name="deductible"
                                                        value={
                                                            this.state.deductible
                                                        }
                                                        onChange={this.onChange}
                                                    />
                                                    {errors.deductible && (
                                                        <div className="invalid-feedback">
                                                            {errors.deductible}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="td-textbox-holder">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className={classnames(
                                                            "form-control textbox",
                                                            {
                                                                "is-invalid":
                                                                    errors.maximumOutOfPocket,
                                                            }
                                                        )}
                                                        placeholder="Maximum out-of-pocket (optional)"
                                                        name="maximumOutOfPocket"
                                                        value={
                                                            this.state.maximumOutOfPocket
                                                        }
                                                        onChange={this.onChange}
                                                    />
                                                    {errors.maximumOutOfPocket && (
                                                        <div className="invalid-feedback">
                                                            {
                                                                errors.maximumOutOfPocket
                                                            }
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>

                                        {/*Row 3*/}
                                        <tr>
                                            <td className="td-textbox-holder">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className={classnames(
                                                            "form-control textbox",
                                                            {
                                                                "is-invalid":
                                                                    errors.copayment,
                                                            }
                                                        )}
                                                        placeholder="Co-payment (optional)"
                                                        name="copayment"
                                                        value={
                                                            this.state.copayment
                                                        }
                                                        onChange={this.onChange}
                                                    />
                                                    {errors.copayment && (
                                                        <div className="invalid-feedback">
                                                            {errors.copayment}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="td-textbox-holder">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className={classnames(
                                                            "form-control textbox",
                                                            {
                                                                "is-invalid":
                                                                    errors.coInsurance,
                                                            }
                                                        )}
                                                        placeholder="Co-insurance (optional)"
                                                        name="coInsurance"
                                                        value={
                                                            this.state.coInsurance
                                                        }
                                                        onChange={this.onChange}
                                                    />
                                                    {errors.coInsurance && (
                                                        <div className="invalid-feedback">
                                                            {errors.coInsurance}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    </table>

                                    {/*Row 4*/}
                                    <table>
                                        <td
                                            className="td-textbox-holder"
                                            style={{ width: "100%" }}
                                        >
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className={classnames(
                                                        "form-control textbox",
                                                        {
                                                            "is-invalid":
                                                                errors.packageDetails,
                                                        }
                                                    )}
                                                    placeholder="Other details (optional)"
                                                    name="packageDetails"
                                                    value={this.state.packageDetails}
                                                    onChange={this.onChange}
                                                />
                                                {errors.packageDetails && (
                                                    <div className="invalid-feedback">
                                                        {errors.packageDetails}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </table>

                                    {/*Submit button*/}
                                    <div className="row justify-content-center">
                                        <input
                                            type="submit"
                                            className="button-submit button-primary"
                                            value="Create Insurance Package"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

InsurancePackageCreator.propTypes = {
    createInsurancePackage: PropTypes.func.isRequired,
    validateInsurancePackage: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    errors: state.errors,
    security: state.security,
});

export default connect(mapStateToProps, { createInsurancePackage, validateInsurancePackage })(
    InsurancePackageCreator
);
