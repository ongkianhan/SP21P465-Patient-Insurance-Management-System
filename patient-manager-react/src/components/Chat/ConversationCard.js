import React, { Component } from 'react'

var numberUnread = 0;
var content = "";

export default class ConversationCard extends Component {
    constructor()
    {
        super();
        this.state = {
            numberUnread: 1,
            content: this.props,
        }
    }
    
    render() {

        function selectConversation()
        {
            //Tell ChatContainer which conversation was clicked
            this.props.selectConversation(this.props.conversation.conversationId);
        }

        return (

            <table className="conv-card-container" onClick={selectConversation.bind(this)}>
                <td className="conv-unread-indicator">
                    {this.state.numberUnread > 0 ? (
                        <span className="conv-has-unread conv-number-unread">
                            {this.state.numberUnread}
                        </span>
                    ) : (
                        <span className="conv-is-read conv-number-unread" />
                    )}
                    
                </td>
                <td className="conv-title">
                    {/*List the first/last names of the users in this group chat, excluding the current user*/}
                    {this.props.conversation.namesInvolved.map(name =>
                        /*Include a comma only if there are still more items remaining in the list*/
                        this.props.conversation.namesInvolved.indexOf(name) < this.props.conversation.namesInvolved.length-1
                        || this.props.conversation.namesInvolved.length == 1
                    ? (
                        <span key={name}>{name}</span>
                    ) : (
                        <span key={name}>{name},</span>
                    ))}
                </td>
            </table>
        )
    }
}
