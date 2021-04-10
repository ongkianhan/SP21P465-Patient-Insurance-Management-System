import React, { Component } from "react";
import {
    getConversationById,
    addMessageToConversation,
} from "../../actions/chatActions";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

class MessageViewport extends Component {
    constructor() {
        super();
        this.state = {
            messageEntry: "",
            messages: [],
        };
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        //Get the messages for the selected conversation
        if (
            this.props.conversationId != undefined &&
            this.props.conversationId > -1
        ) {
            this.props.getConversationById(this.props.conversationId);
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    sendMessage() {
        const senderId = this.props.security.user.userId;
        var message = {
            /*Sender name is not persisted to database*/
            senderName:
                this.props.currentUser.currentUser.firstName +
                " " +
                this.props.currentUser.currentUser.lastName,
            content: this.state.messageEntry,
        };
        //Add the new message to the database
        this.props.addMessageToConversation(
            senderId,
            this.props.conversationId,
            message
        );

        //Add message to user interface
        this.props.conversation.conversation.push(message);
        this.setState({ messages: this.props.conversation.conversation });
    }

    render() {
        if (this.props.conversationId < 0) {
            return <span className="chat-viewport-container" />;
        }
        return (
            <div className="col-9 chat-viewport-container">
                <div className="message-container">
                    {/* List of messages goes here */}
                    {this.props.conversation.conversation.map((message) =>
                        message.senderName !=
                        this.props.currentUser.currentUser.firstName + " " + this.props.currentUser.currentUser.lastName 
                        ? (
                            /* Received messages are aligned left */
                            <span>
                                <p className="message-header received">
                                    {message.senderName}
                                </p>
                                <p className="message message-received received">
                                    {message.content}
                                </p>
                            </span>
                        ) : (
                            /* Send messages are aligned right */
                            <span>
                                <p className="message-header sent">
                                    {message.senderName}
                                </p>
                                <p className="message message-sent sent">
                                    {message.content}
                                </p>
                            </span>
                        )
                    )}
                </div>
                <table className="chatbar-container">
                    <td>
                        <input
                            className="chatBar"
                            placeholder="Type a message..."
                            rows="1"
                            id="chatBar"
                            onKeyPress={(e) => {
                                if (e.key === "Enter") e.preventDefault();
                            }}
                            name="messageEntry"
                            value={this.state.messageEntry}
                            onChange={this.onChange}
                        ></input>
                    </td>
                    <td id="chatSendButtonContainer">
                        <span
                            id="chatSendButton"
                            onClick={this.sendMessage.bind(this)}
                        >
                            Send
                        </span>
                    </td>
                </table>
            </div>
        );
    }
}

//Set up methods to retrieve conversations from the database
MessageViewport.propTypes = {
    conversation: PropTypes.object.isRequired,
    getConversationById: PropTypes.func.isRequired,
    addMessageToConversation: PropTypes.func.isRequired,
    security: PropTypes.object.isRequired,
};

//Add the actual doctor state/data to the list of conversations on the page
const mapStateToProps = (state) => ({
    conversation: state.conversation,
    security: state.security,
});

export default connect(mapStateToProps, {
    getConversationById,
    addMessageToConversation,
})(MessageViewport);
