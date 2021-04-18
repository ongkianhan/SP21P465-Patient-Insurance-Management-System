import React, { Component } from 'react';
import WhoIsOnlineCard from "./WhoIsOnlineCard";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";


class WhoIsOnlineList extends Component {
    constructor()
    {
        super();
        this.state = {
            
        }
    }

    async componentDidMount() 
    {
        //Retrieve this user's list of conversations
        const userId = this.props.security.user.userId;
        await this.props.getConversationsByUserId(userId);
    }
    
    render() {
        const {allConversations} = this.props.conversation;
        return (
            <div className="col-9 chat-online-container">
                Users Online
                <div className="chat-online-sub-container">
                    {/* Conversations */}
                    {allConversations.map(conversation => (
                        <WhoIsOnlineCard key={conversation.namesInvolved} conversation={conversation} selectConversation={this.props.selectConversation} />
                    ))}
                </div>
                
                <span /*className="modal-close-button" onClick={this.hide.bind(this)}*/ style={{ color: "black", textAlign: "center", fontSize: "30px" }} >&times;</span>
            </div>
        )
    }
}

WhoIsOnlineList.propTypes = {
    security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    security: state.security
});

export default connect(mapStateToProps, null)(WhoIsOnlineList);