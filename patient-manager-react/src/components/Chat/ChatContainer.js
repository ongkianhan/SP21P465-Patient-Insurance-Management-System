import React, { Component } from 'react'
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import classnames from "classnames";
import {getConversationById, getConversationsByUserId} from "../../actions/chatActions";
import { getCurrentUser } from "../../actions/userActions";
import ConversationList from './ConversationList';
import WhoIsOnlineList from './WhoIsOnlineList';
import MessageViewport from './MessageViewport';
import AddUserPopup from "./AddUserPopup";
import {giveUserOnlineStatus, giveUserOfflineStatus} from "../../actions/userActions";

var conversationList;

class ChatContainer extends Component {

    invervalId;

    constructor()
    {
        super();
        this.state = {
            conversationId: -1,
            popup: null,
            shownComponent: <span/>
        }
        this.updateConversationList = this.updateConversationList.bind(this);
        this.hideWhoIsOnlineList = this.hideWhoIsOnlineList.bind(this);
    }

    async componentDidMount()
    {
        //Give this user the online status
        this.props.giveUserOnlineStatus(this.props.security.user.userId);

        //Make a request to get all the user's info from the database
        //so that the current user's name can align their own messages to the right in MessageViewport
        await this.props.getCurrentUser(this.props.security.user.userId, this.props.history);
        
        //Continuously update the conversations
        //this.intervalId = setInterval(this.updateConversationList.bind(this), 10000);

        //Add an event listener for closing the tab.
        //This will make the user have the offline status.
        window.addEventListener('beforeunload', (event) => {
            //Delay closing of the tab
            event.preventDefault();
          
            //End automatic updates to the conversations
            clearInterval(this.intervalId);
            //Make the current user offline
            this.props.giveUserOfflineStatus(this.props.security.user.userId);
            return undefined;
        });
    }

    componentWillUnmount() 
    {
        //End automatic updates to the conversations
        //when leaving the page
        clearInterval(this.intervalId);
    }


    selectConversation = (id) => {
        //Pull the messages from the database
        this.props.getConversationById(id, this.props.security.user.userId);
        //Update MessageViewport
        this.setState({ conversationId: id });
        this.setState({ shownComponent: 
            <MessageViewport conversationId={id} currentUser={this.props.currentUser} /> });
    }

    async updateConversationList() 
    {
        //Retrieve this user's list of conversations
        const userId = this.props.security.user.userId;
        await this.props.getConversationsByUserId(userId);
    }

    async showInviteNewUserPopup() {
        //Destroy the old popup if it exists
        await this.setState({popup: null})
        //Create a new popup and show it
        this.setState({popup: <AddUserPopup conversationId={this.state.conversationId} updateConversationList={this.updateConversationList} />})
    }

    showWhoIsOnlineList = () => {
        //Update MessageViewport
        this.setState({ shownComponent: 
            <WhoIsOnlineList key={this.props.conversation.namesInvolved} conversationId={this.state.conversationId} conversation={this.props.conversation} hideWhoIsOnlineList={this.hideWhoIsOnlineList}  /> });
    }

    hideWhoIsOnlineList = () => {
        //Replace the online list with MessageViewport
        this.selectConversation(this.state.conversationId);
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
                            {/* Display the invite new user button if a conversation is selected */
                                this.state.conversationId > 0 ? (
                                <span>
                                    <button onClick={this.showInviteNewUserPopup.bind(this)} className="card-button button-minor">
                                        Invite another person
                                    </button>
                                    &nbsp;&nbsp;
                                    <button onClick={this.showWhoIsOnlineList.bind(this)} className="card-button button-minor">
                                        See Who's Online
                                    </button>
                                </span>
                            ) : (
                                <span/>
                            )}
                            
                        </div>
                    </div>
                </div>    
            


                <div className="row chat-table-container">

                    <ConversationList key={this.props.conversation.namesInvolved}  selectedConversationId={this.state.conversationId} conversation={this.props.conversation} getConversationsByUserId={this.props.getConversationsByUserId} updateConversationList={this.updateConversationList} selectConversation={this.selectConversation} />

                    {this.state.shownComponent}
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
    giveUserOnlineStatus: PropTypes.object.isRequired,
    giveUserOfflineStatus: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired,
} 

const mapStateToProps = state => ({
    conversation: state.conversation,
    currentUser: state.currentUser,
    security: state.security,
})

export default connect(mapStateToProps, {getConversationById, getConversationsByUserId, getCurrentUser, giveUserOnlineStatus, giveUserOfflineStatus}) (ChatContainer);