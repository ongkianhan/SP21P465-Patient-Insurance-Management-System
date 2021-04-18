import React, { Component } from 'react'
import onlineIcon from "../../static/onlineIcon.png";
import offlineIcon from "../../static/offlineIcon.png";

var numberUnread = 0;

export default class WhoIsOnlineCard extends Component {
    constructor()
    {
        super();
        this.state = {
            numberUnread: -1,
            title: <span>Loading...</span>,
        }
    }

    componentDidMount()
    {
        //Get the names of the users involved in this conversation
        this.generateTitle();
    }

    //List the first/last names of the users in this group chat, excluding the current user
    generateTitle = () => {
        const namesInvolved = this.props.conversation.namesInvolved;
        if (namesInvolved == undefined) {return;}
                
        //Place commas between the names
        let title = "";
        for (var i=0; i < namesInvolved.length; i++)
        {
            if (i == namesInvolved.length - 2 && namesInvolved.length > 2)
            {
                title += namesInvolved[i] + ", and ";
            }
            else if (i < namesInvolved.length - 1 && namesInvolved.length > 2)
            {
                title += namesInvolved[i] + ", ";
            }
            else if (i == 0 && namesInvolved.length == 2)
            {
                title += namesInvolved[i] + " and ";
            }
            else
            {
                title += namesInvolved[i];
            }
        }
        //Update the UI        
        this.setState({ title: title });
    }

    
    render() 
    {
        function selectConversation()
        {
            //Tell ChatContainer which conversation was clicked
            this.props.selectConversation(this.props.conversation.conversationId);
            //Clear the number of unreads
            this.setState({numberUnread: 0});
        }

        //Show a blank span if the number of unread messages has not yet been received
        if (this.state.numberUnread < 0) {
            this.setState({numberUnread: this.props.conversation.numberUnread});
        }

        return (
            <div className="row online-card-container" onClick={selectConversation.bind(this)}>
                <div className="col-2 online-status-icon-container">
                    {this.state.numberUnread > 0 ? (
                        <img src={onlineIcon} className="online-status-icon"/>
                    ) : (
                        <img src={offlineIcon} className="online-status-icon"/>
                    )}
                </div>                
                <div className="col-10 online-title">
                    {/*List the first/last names of the users in this group chat, excluding the current user*/}
                    {this.state.title}
                </div>
            </div>
        )
    }
}
