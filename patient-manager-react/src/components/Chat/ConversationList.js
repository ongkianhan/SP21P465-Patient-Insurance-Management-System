import React, { Component } from 'react';
import ConversationCard from "./ConversationCard";
import { getConversationsByUserId } from "../../actions/chatActions";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import NewConversationPopup from './NewConversationPopup';

var noConversationsMessage = null;

class ConversationList extends Component {
    constructor()
    {
        super();
        this.state = {
            popup: null
        }
    }

    async componentDidMount() 
    {
        //Retrieve this user's list of conversations
        const userId = this.props.security.user.userId;
        await this.props.getConversationsByUserId(userId);
    }

    async showNewConversationPopup() 
    {
        //Destroy the old conv popup if it exists
        await this.setState({popup: null})
        //Create a new conv popup and show it
        this.setState({popup: <NewConversationPopup />})
    }
    
    render() {
        const {allConversations} = this.props.conversation;
        return (
            <div className="chat-conversation-container">
                {/* Conversations */}
                {allConversations.map(conversation => (
                    <ConversationCard key={conversation.conversationId} conversation={conversation} selectConversation={this.props.selectConversation} />
                ))}

                {/*New Conversation Button*/}
                <div id="buttonNewConversation" onClick={this.showNewConversationPopup.bind(this)}>
                    New Conversation
                </div>

                {this.state.popup}
            </div>
        )
    }
}

//Set up methods to retrieve conversations from the database
ConversationList.propTypes = {
    conversation: PropTypes.object.isRequired,
    getConversationsByUserId: PropTypes.func.isRequired,
    security: PropTypes.object.isRequired,
};

//Add the actual doctor state/data to the list of conversations on the page
const mapStateToProps = (state) => ({
    conversation: state.conversation,
    security: state.security
});

export default connect(mapStateToProps, { getConversationsByUserId })(ConversationList);