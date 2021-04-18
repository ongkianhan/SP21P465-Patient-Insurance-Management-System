import React, { Component } from 'react';
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { getInsurancePackagesByInsurerId } from "../../actions/insurancePackageActions";
import { Link } from "react-router-dom";
import InsurancePackageDashboardCard from "../Insurance/InsurancePackageDashboardCard";


class Dashboard extends Component
{
    constructor()
    {
        super();
    }

    async componentDidMount() //When the component loads (life cycle method)
    {
        //const {userId} = this.props.match.params;
        await this.props.getInsurancePackagesByInsurerId(this.props.security.user.userId)
        //Display a message if there are no appointments
    }

    render() {

        const { allPackages } = this.props.insurancePackage;
        return (
            <div>
                <h1>Welcome to the Insurer Dashboard</h1>
                <p>{/*this.props.security.user.userType*/}</p>
                
                    <Link to="/create-insurance-package">
                        <button className="btn btn-primary mb-3">
                            Create Insurance
                        </button>
                    </Link>
                
                <div>
                {allPackages.map(insurancePackage => 
                                <InsurancePackageDashboardCard makeInsuranceRecommendation={this.makeInsuranceRecommendation}
                                key={insurancePackage.insurancePackageId} insurancePackage={insurancePackage} />
                            )}
                </div>


            </div>
        )
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

export default connect(mapStateToProps, {getInsurancePackagesByInsurerId})(Dashboard);