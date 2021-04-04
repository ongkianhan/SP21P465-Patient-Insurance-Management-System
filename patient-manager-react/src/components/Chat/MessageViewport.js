import React, { Component } from 'react'
import classnames from "classnames";

export default class MessageViewport extends Component {
    render() {
        return (
            <div className="chat-viewport-container">
                <div className="message-container">
                    <p className="message-header received">Dr T. Colin Campbell</p>
                    <p className="message message-received received">Dummy message. </p>

                    <p className="message-header sent">You</p>
                    <p className="message message-sent sent">Dummy message. </p>

                    <p className="message-header received">Dr Alan Goldhamer</p>
                    <p className="message message-received received">Dummy message. </p>

                    <p className="message-header sent">You</p>
                    <p className="message message-sent sent">Dummy message. </p>
                </div>
                <table className="chatbar-container">
                    <td>
                        <input
                            className="chatBar"
                            placeholder="Type a message..."
                            rows="1"
                            id="chatBar"
                            onKeyPress={(e) => {
                                if (e.key === "Enter")
                                    e.preventDefault();
                            }}
                        ></input>
                    </td>
                    <td id="chatSendButtonContainer">
                        <span id="chatSendButton">
                            Send
                        </span>
                    </td>
                </table>
            </div>
        )
    }
}
