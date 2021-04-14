import React, { Component } from 'react'
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import classnames from "classnames";
import {getConversationById, getConversationsByUserId} from "../../actions/chatActions";
import { getCurrentUser } from "../../actions/userActions";
import ConversationList from './ConversationList';
import MessageViewport from './MessageViewport';
import AddUserPopup from "./AddUserPopup";

var conversationList;

class ChatContainer extends Component {
    constructor()
    {
        super();
        this.state = {
            conversationId: -1,
            popup: null
        }
        this.updateConversationList = this.updateConversationList.bind(this);
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

    updateConversationList() 
    {
        //Retrieve this user's list of conversations
        const userId = this.props.security.user.userId;
        this.props.getConversationsByUserId(userId);
    }

    async showInviteNewUserPopup() {
        //Destroy the old popup if it exists
        await this.setState({popup: null})
        //Create a new popup and show it
        this.setState({popup: <AddUserPopup conversationId={this.state.conversationId} updateConversationList={this.updateConversationList} />})
    }


    render() {
        return (
            <div className="chat-primary-container">

                <div className="row">
                    <div className="col-6">
                        <h1 className="display-5 text-left page-header">Chat</h1>
                    </div>
                    <div className="col-6">
                        <div className="row justify-content-end">
                            <button onClick={this.showInviteNewUserPopup.bind(this)} className="card-button button-minor">
                                Invite another person
                            </button>
                        </div>
                    </div>
                </div>    
            


                <div className="row chat-table-container">

                    <ConversationList conversation={this.props.conversation} getConversationsByUserId={this.props.getConversationsByUserId} updateConversationList={this.updateConversationList} selectConversation={this.selectConversation} />

                    <MessageViewport conversationId={this.state.conversationId} currentUser={this.props.currentUser} />

                </div>

                {this.state.popup}
            </div>
        )
    }
}

ChatContainer.propTypes = {
    getConversationById: PropTypes.func.isRequired,    
    addUserToConversation: PropTypes.func.isRequired,
    conversation: PropTypes.object.isRequired,
    getConversationsByUserId: PropTypes.func.isRequired,
    getCurrentUser: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired,
} 

const mapStateToProps = state => ({
    conversation: state.conversation,
    currentUser: state.currentUser,
    security: state.security,
})

export default connect(mapStateToProps, {getConversationById, getConversationsByUserId, getCurrentUser}) (ChatContainer);