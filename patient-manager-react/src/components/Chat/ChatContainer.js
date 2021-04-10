import React, { Component } from 'react'
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import classnames from "classnames";
import {getConversationById} from "../../actions/chatActions";
import { getCurrentUser } from "../../actions/userActions";
import ConversationList from './ConversationList';
import MessageViewport from './MessageViewport';

class ChatContainer extends Component {
    constructor()
    {
        super();
        this.state = {
            conversationId: -1
        }
    }

    selectConversation = (id) => {
        //Pull the messages from the database
        this.props.getConversationById(id);
        //Update MessageViewport
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
                        <MessageViewport conversationId={this.state.conversationId} currentUser={this.props.currentUser} />
                    </td>
                </table>
            </div>
        )
    }
}

ChatContainer.propTypes = {
    getConversationById: PropTypes.func.isRequired,
    conversation: PropTypes.object.isRequired,
    getCurrentUser: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired,
} 

const mapStateToProps = state => ({
    conversation: state.conversation,
    currentUser: state.currentUser
})

export default connect(mapStateToProps, {getConversationById, getCurrentUser}) (ChatContainer);