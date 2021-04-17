import React, { Component } from "react";
import { createNewUser, validateUser } from "../../actions/securityActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { getCurrentUser } from "../../actions/userActions";
import defaultProfileIcon from "../../static/defaultProfileIcon.png";
import { Link } from "react-router-dom";
import { DOC, PAT, INS } from "../../actions/userRoles";
import { getInsurancePackagesByInsurerId } from  "../../actions/packageActions";
import InsurancePackageDrawerCard from "../Insurance/InsurancePackageDrawerCard";


class PatientAccount extends Component 
{
    constructor() {
        super();
        this.state = {
            drawerDisplayStyle: "none",
        }
    }

    async componentDidMount()
    {
        //Get the insurance packages held by the user if they are an insurer
        if (this.props.security.user.userType == INS)
        {
            await this.props.getInsurancePackagesByInsurerId(this.props.security.user.userId);
        }
    }
    
    //Show the drawer
    show() {
        this.setState({drawerDisplayStyle: "block"});
    }
    //Close the drawer
    hide() {
        this.setState({drawerDisplayStyle: "none"});
    }
    //Show or hide the drawer based on its current visibility
    toggleDrawerVisibility() {
        if (this.state.drawerDisplayStyle == "none") {
            this.show();
        }
        else {
            this.hide();
        }
    }

    render() {
        const { currentUser } = this.props.currentUser;
        const { allPackages } = this.props.insurancePackage;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <img className="col" src={defaultProfileIcon} />
                    </div>
                    <div className="col-6 text-left">
                        <h1 className="font-weight-bold">
                            {currentUser.firstName} {currentUser.lastName}
                        </h1>
                        <h5>
                            Chat name: {currentUser.email}
                        </h5>
                        <h5>
                            Age: {currentUser.age}
                        </h5>
                        <h5>
                            Height: {currentUser.height}
                        </h5>
                        <h5>
                            Weight: {currentUser.weight} lbs
                        </h5>

                        {/* If the patient drinks or smokes, show relevant message(s) */}
                        {currentUser.drinking ? (
                            <h5>• Drinks alcohol</h5>
                        ) : (
                            <span />
                        )}
                        {currentUser.smoking ? <h5>• Smokes</h5> : <span />}
                    </div>

                    {/* If the user is a insurance provider, show a button to open the insurance drawer*/}
                    {this.props.security.user.userType == INS ? (
                        <div className="col-3">
                            <button onClick={this.toggleDrawerVisibility.bind(this)} className="col my-1 button-primary button-card">
                                Recommend an Insurance Package
                            </button>
                        </div> 
                        ) : ( <span/> )
                    }
                </div>
                <div className="row">
                    <div className="col-9 text-left">
                        <h5>
                            Medical History: {currentUser.medicalHistory}
                        </h5>
                        {/* If the user is a doctor, show the patient's allergies */}
                        {this.props.security.user.userType == DOC ? (
                            <h5>Allergies: {currentUser.allergies}</h5>
                        ) : (
                            <span />
                        )}
                    </div>
                </div>





                {/* If the user is a insurance provider, show the insurer's insurance packages */}
                {this.props.security.user.userType == INS ? (
                    <div className="insurance-package-drawer" style={{display: this.state.drawerDisplayStyle}}>
                        <button onClick={this.hide.bind(this)} className="col my-1 button-minor card-button light-gray-bg" style={{color: "black", maxHeight: "5vh"}}>
                            Hide Drawer
                        </button>
                        <div style={{overflowY: "auto", maxHeight: "86vh"}}>
                        {allPackages.map(insurancePackage => 
                            <InsurancePackageDrawerCard key={insurancePackage.insurancePackageId} insurancePackage={insurancePackage} />
                        )}
                        </div>
                    </div>
                ) : (
                    <span />
                )}
            </div>
        );
    }
}

PatientAccount.propTypes = {
    insurancePackage: PropTypes.object.isRequired,
    getInsurancePackagesByInsurerId: PropTypes.func.isRequired,
    getCurrentUser: PropTypes.func.isRequired,
    security: PropTypes.object.isRequired,
    validateUser: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    insurancePackage: state.insurancePackage,
    currentUser: state.currentUser,
    security: state.security,
    errors: state.errors,
});

export default connect(mapStateToProps, { getCurrentUser, validateUser, getInsurancePackagesByInsurerId })(
    PatientAccount
);
