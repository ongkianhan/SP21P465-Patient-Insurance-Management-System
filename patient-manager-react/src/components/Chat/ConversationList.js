import React, { Component } from 'react';
import ConversationCard from "./ConversationCard";
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
        this.setState({popup: <NewConversationPopup updateConversationList={this.props.updateConversationList} />})
    }
    
    render() {
        const {allConversations} = this.props.conversation;
        return (
            <div className="col-3 chat-conversation-container">
                {/* Conversations */}
                {allConversations.map(conversation => (
                    conversation.conversationId != this.props.selectedConversationId ?
                    (
                        <ConversationCard key={conversation.namesInvolved} conversation={conversation} selectConversation={this.props.selectConversation} />
                    ) : (
                        /* Show a different background color for the conv. card if it is selected */
                        <ConversationCard isSelected={true} key={conversation.namesInvolved} conversation={conversation} selectConversation={this.props.selectConversation} />
                    )
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
    security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    security: state.security
});

export default connect(mapStateToProps, null)(ConversationList);