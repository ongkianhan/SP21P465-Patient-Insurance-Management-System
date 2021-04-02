import React, { Component } from "react";
import { createNewUser, validateUser } from "../../actions/securityActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { getCurrentUser } from "../../actions/userActions";
import defaultProfileIcon from "../../static/defaultProfileIcon.png";
import {Link} from "react-router-dom";

class DoctorProfileEditor extends Component {
    constructor() {
        super();

        this.state = {
            userId: "",
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            specialization: "",
            hospitalName: "",
            errors: {},
            hasSuccess:false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        
    }

    async componentDidMount()
    {
        //Make a request to get all the user's info from the database
        const {userId} = this.props.match.params;
        this.setState({userId: userId});
        await this.props.getCurrentUser(userId, this.props.history);

        console.log(this.props.currentUser)

        const {
            email,
            firstName,
            lastName,
            specialization,
            hospitalName,
        } = this.props.currentUser.currentUser;
        //Display the user's information
        this.setState({
            email,
            firstName,
            lastName,
            specialization,
            hospitalName
        });
    }


    componentWillReceiveProps(nextProps) {
        //Show errors if they exist
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
        
    }
    
    

    //When submitting, create the doctor
    async onSubmit(e) {
        e.preventDefault();
        //Create a new doctor account
        const newDoctor = {
            userId: this.state.userId,
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            specialization: this.state.specialization,
            hospitalName: this.state.hospitalName,
            errors: {},
        };
    
        //Validate the user
        const frontEndErrors = validateUser(newDoctor)
        if (Object.keys(frontEndErrors).length != 0) //if errors exist
        {
            this.setState({ errors: frontEndErrors });
            return;
        }

        //Send the signup request
        await this.props.createNewUser(newDoctor, "doctor", this.props.history, this.props.login);

        if (Object.keys(this.state.errors).length == 0) //if no errors exist
        {
            const {userId} = this.props.match.params;
            this.setState({userId: userId});
            await this.props.getCurrentUser(userId, this.props.history);
            
            this.setState({hasSuccess:true})
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        
        const { errors } = this.state;

        let successMessage;
        if(this.state.hasSuccess){
            successMessage = (
                <span>
                    <h5>
                    Success! Account has been successfully updated
                    </h5>
                </span>
            );
        }
        else{
            successMessage = (
                <span>
                </span>
            );
        }
        const {currentUser} = this.props.currentUser
        return (
            <div className="container">
                <div className="row">
                    <div className = "col-3">
                        <img className="col" src={defaultProfileIcon} />
                    </div>
                    <div className = "col-6 text-left">
                        <h1 className = "font-weight-bold">{currentUser.firstName} {currentUser.lastName}</h1>
                        <h3>{currentUser.specialization}</h3>
                        <h3>{currentUser.hospitalName}</h3>
                    </div>
                    <div className = "col-3 text-left">
                    {this.props.security.user.userType == "PAT" ? (
                        <Link to={`/schedule-appointment/${currentUser.userId}`}>
                            <button className="col my-1 button-primary button-card">
                                Make Appointment
                            </button>
                        </Link>
                    ) : (<span/>)}
                        
                        <Link to={""}>
                            <button className="col my-1 button-secondary button-card">
                                Show Directions
                            </button>
                        </Link>
                    </div>
                    <div className="row pt-3 pl-5">
                        <div className = "col- text-left">
                            <h1>Reviews</h1>
                            <h3>0 Stars | 0 Reviews</h3>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



DoctorProfileEditor.propTypes = {
    createNewUser: PropTypes.func.isRequired,
    getCurrentUser: PropTypes.func.isRequired,
    security: PropTypes.object.isRequired,
    validateUser: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    currentUser: state.currentUser,
    security: state.security,
    errors: state.errors
});

export default connect(mapStateToProps, { createNewUser, getCurrentUser, validateUser })(DoctorProfileEditor);