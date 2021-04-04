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
        return (
            <table className="conv-card-container">
                <td className="conv-unread-indicator">
                    <span className="conv-has-unread">
                        {this.state.numberUnread}
                    </span>
                </td>
                <td className="conv-title">
                    {}
                    {this.props.conversation.namesInvolved.map(name => (
                        <span key={name}>{name}</span>
                    ))}
                </td>
            </table>
        )
    }
}
