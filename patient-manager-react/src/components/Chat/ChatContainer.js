import React, { Component } from 'react';
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import ConversationList from './ConversationList';
import MessageViewport from './MessageViewport';

export default class ChatContainer extends Component {
    constructor()
    {
        super();
        this.state = {
            conversationId: -1
        }
    }

    selectConversation = (id) => {
        this.setState({ conversationId: id });
    }

    render() {
        
        
        return (
            <div className="chat-primary-container">
                <h1 className="display-5 text-left page-header">Chat</h1>

                <table className="chat-table-container">
                    <td>
                        <ConversationList selectConversation={this.selectConversation} />
                    </td>
                    <td>
                        <MessageViewport conversationId={this.state.conversationId} />
                    </td>
                </table>
            </div>
        )
    }
}

/*ChatContainer.propTypes = {
    createAppointment: PropTypes.func.isRequired,
    getAppointmentsByDoctorId: PropTypes.func.isRequired,
    validateAppointment: PropTypes.func.isRequired,
    getDoctor: PropTypes.func.isRequired,
    appointment: PropTypes.object.isRequired,
    doctor: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
} 

//Add the actual doctor state/data to the list of doctors on the page
const mapStateToProps = state => ({
    appointment: state.appointment,
    doctor: state.doctor,
    errors: state.errors
})

export default connect(mapStateToProps, {ChatContainerz}) (ChatContainer);*/