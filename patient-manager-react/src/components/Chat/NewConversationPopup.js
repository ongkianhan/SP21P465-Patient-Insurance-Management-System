import React, { Component } from 'react';
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import classnames from "classnames";
import { createConversation } from '../../actions/chatActions';

class NewConversationPopup extends Component {
    constructor() {
        super();

        this.state = {
            recipientEmail: "",
            display: "block", /* Style which dictates if the modal is "block" (shown) or "none" (hidden) */
            errors: {},
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    async submit() {
        //Create the new conversation
        const senderId = this.props.security.user.userId;
        var success = await this.props.createConversation(senderId, this.state.recipientEmail);

        //Update the ConversationList user interface
        this.props.updateConversationList(this.props.security.user.userId);

        //Clear the text box and hide the modal if there are no errors
        if (success === true) {
            this.setState({recipientEmail: "", display: "none"});
        }
    }
    
    
    //Show the modal
    show() {
        this.setState({display: "block"});
    }
    //Close the modal
    hide() {
        this.setState({display: "none"});
    }

    render() {
        const {display} = this.state;
        const { errors } = this.state;
        return (
            <div className="modal-scrim" style={{display: display}}>
                <div className="modal-content">
                    <span className="modal-header-text">Start a Conversation</span>
                    
                    <span className="label-conv-popup">Enter the email of the user you want to talk to</span>
                    <input
                        placeholder="Recipient email address"
                        rows="1"
                        className={classnames(
                            "input-conv-popup",
                            {
                                "is-invalid":
                                    errors.userNotFound,
                            }
                        )}
                        value={this.state.recipientEmail}
                        name="recipientEmail"
                        onKeyPress={(e) => {
                            if (e.key === "Enter")
                                e.preventDefault();
                        }}
                        onChange={this.onChange}
                    ></input>
                    {errors.userNotFound && (
                        <div className="invalid-feedback">
                            {
                                errors.userNotFound
                            }
                        </div>
                    )}

                    <td> {/*td centers the element*/}
                        <button onClick={this.submit.bind(this)} className="button-primary card-button button-popup-confirmation">
                            Start Messaging
                        </button>
                    </td>

                    <p onClick={this.hide.bind(this)} className="modal-close-button-text ">
                        Close
                    </p>
                </div>
            </div>
        )
    }
}

NewConversationPopup.propTypes = {
    createConversation: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    errors: state.errors,
    security: state.security,
});

export default connect(mapStateToProps, { createConversation })(NewConversationPopup);
