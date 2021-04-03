import React, { Component } from 'react'
import ConversationCard from "./ConversationCard";

export default class ConversationList extends Component {
    render() {
        return (
            <div className="chat-conversation-container">
                <ConversationCard />
            </div>
        )
    }
}
