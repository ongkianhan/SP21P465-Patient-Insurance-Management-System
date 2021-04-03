import React, { Component } from 'react'
import ConversationList from './ConversationList';
import MessageViewport from './MessageViewport';

export default class ChatContainer extends Component {
    render() {
        return (
            <div className="chat-primary-container">
                <h1 className="display-5 text-left page-header">Chat</h1>

                <table className="chat-table-container">
                    <td>
                        <ConversationList />
                    </td>
                    <td>
                        <MessageViewport />
                    </td>
                </table>
            </div>
        )
    }
}
