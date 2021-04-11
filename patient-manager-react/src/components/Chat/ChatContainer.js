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

    async componentDidMount()
    {
        //Make a request to get all the user's info from the database
        //so that the current user's name can align their own messages to the right in MessageViewport
        await this.props.getCurrentUser(this.props.security.user.userId, this.props.history);
    }

    selectConversation = (id) => {
        //Pull the messages from the database
        this.props.getConversationById(id, this.props.security.user.userId);
        //Update MessageViewport
        this.setState({ conversationId: id });        
    }

    render() {
        return (
            <div className="chat-primary-container">
                <h1 className="display-5 text-left page-header">Chat</h1>
                <div className="row chat-table-container">
                    <ConversationList selectConversation={this.selectConversation} />
                    <MessageViewport conversationId={this.state.conversationId} currentUser={this.props.currentUser} />
                </div>
            </div>
        )
    }
}

ChatContainer.propTypes = {
    getConversationById: PropTypes.func.isRequired,
    conversation: PropTypes.object.isRequired,
    getCurrentUser: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired,
} 

const mapStateToProps = state => ({
    conversation: state.conversation,
    currentUser: state.currentUser,
    security: state.security,
})

export default connect(mapStateToProps, {getConversationById, getCurrentUser}) (ChatContainer);