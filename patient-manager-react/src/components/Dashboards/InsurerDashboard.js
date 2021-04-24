import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { getInsurancePackagesByInsurerId } from "../../actions/insurancePackageActions";
import { Link } from "react-router-dom";
import InsurancePackageDashboardCard from "../Insurance/InsurancePackageDashboardCard";
import CovidArticles from "./CovidArticles"

class Dashboard extends Component {
    constructor() {
        super();
    }

    async componentDidMount() { //When the component loads (life cycle method)
        //const {userId} = this.props.match.params;
        await this.props.getInsurancePackagesByInsurerId(
            this.props.security.user.userId
        );
        //Display a message if there are no appointments
    }

    render() {
        const { allPackages } = this.props.insurancePackage;
        return (
            <div>
                <Link to="/create-insurance-package">
                    <button className="btn btn-primary mb-3">
                        Create Insurance
                    </button>
                </Link>

                <div>
                    <h2>Your Insurance Packages</h2>
                    {allPackages.map((insurancePackage) => (
                        <InsurancePackageDashboardCard
                            makeInsuranceRecommendation={
                                this.makeInsuranceRecommendation
                            }
                            key={insurancePackage.insurancePackageId}
                            insurancePackage={insurancePackage}
                        />
                    ))}
                </div>
                <div>
                    <CovidArticles/>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    security: PropTypes.object.isRequired,
    getInsurancePackagesByInsurerId: PropTypes.func.isRequired,
    insurancePackage: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    insurancePackage: state.insurancePackage,
    security: state.security,
});

export default connect(mapStateToProps, { getInsurancePackagesByInsurerId })(
    Dashboard
);
