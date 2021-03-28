import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { DOC, PAT, INS } from "../../actions/userRoles";
import DoctorProfileEditor from "./DoctorProfileEditor";
import PatientProfileEditor from "./PatientProfileEditor";
import InsurerProfileEditor from "./InsurerProfileEditor";
import { getCurrentUser } from "../../actions/userActions";

class ProfileContainer extends Component 
{
    async componentDidMount()
    {
        //Make a request to get all the user's info from the database
        const {userId} = this.props.match.params;
        this.setState({userId: userId});
        await this.props.getCurrentUser(userId, this.props.history);
    }

    render()
    {
        //Check the role associated with the user whose profile this is
        //and display the correct component accordingly
        var TargetProfile = null;
        switch (this.props.currentUser.currentUser.userType)
        {
            case DOC:
                TargetProfile = DoctorProfileEditor;
                break;
            case PAT:
                TargetProfile = PatientProfileEditor;
                break;
            case INS:
                TargetProfile = InsurerProfileEditor;
                break;
        }

        return (
            <div>
                <Route component={TargetProfile} />
            </div>
        )
    }
}

ProfileContainer.propTypes = {
    getCurrentUser: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired, /*who the profile belongs to*/
};

const mapStateToProps = (state) => ({
    currentUser: state.currentUser
});

export default connect(mapStateToProps, { getCurrentUser })(ProfileContainer);