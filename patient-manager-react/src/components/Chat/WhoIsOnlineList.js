import React, { Component } from "react";
import WhoIsOnlineCard from "./WhoIsOnlineCard";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

class WhoIsOnlineList extends Component {
    constructor() {
        super();
    }

    componentDidMount() {}

    render() {
        const { allConversations } = this.props.conversation;
        return (
            <div className="col-9 chat-online-container">
                Users Online
                <div className="chat-online-sub-container">
                    {/* Online & Offline users */}
                    {allConversations.map((conversation) =>
                        /* Check if the target conversation is the one selected */
                        conversation.conversationId == this.props.conversationId ? (
                            /* Refer to the entire list of users in the conversation */
                            conversation.namesInvolved.map((personName) =>
                                /* If the user is in the online list, mark them as online */
                                !conversation.usersOnline.includes(personName) ? (
                                    <WhoIsOnlineCard
                                        key={personName}
                                        personName={personName}
                                        isOnline={false}
                                    />
                                ) : (
                                    /* Otherwise, they are offline */
                                    <WhoIsOnlineCard
                                        key={personName}
                                        personName={personName}
                                        isOnline={true}
                                    />
                                )
                            )
                        ) : (
                            <span />
                        )
                    )}
                </div>
                {/*Close button*/}
                <span
                    onClick={this.props.hideWhoIsOnlineList}
                    className="online-list-close-button"
                    style={{
                        color: "black",
                        textAlign: "center",
                        fontSize: "30px",
                    }}
                >
                    &times;
                </span>
            </div>
        );
    }
}

WhoIsOnlineList.propTypes = {
    security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    security: state.security,
});

export default connect(mapStateToProps, null)(WhoIsOnlineList);
