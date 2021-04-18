import React, { Component } from 'react'

var numberUnread = 0;

export default class ConversationCard extends Component 
{    
    backgroundColor;

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

        //Use a different background color if the card is selected
        if (this.props.isSelected) {
            this.backgroundColor = "#efefef";
        }
        else this.backgroundColor = "#dedede";

        return (
            <div className="row conv-card-container" style={{backgroundColor: this.backgroundColor}} onClick={selectConversation.bind(this)}>
                <div className="col-2 conv-unread-indicator">
                    {this.state.numberUnread > 0 ? (
                        <span className="conv-has-unread conv-number-unread">
                            {this.state.numberUnread}
                        </span>
                    ) : (
                        <span className="conv-is-read conv-number-unread" />
                    )}
                </div>                
                <div className="col-10 conv-title">
                    {/*List the first/last names of the users in this group chat, excluding the current user*/}
                    {this.state.title}
                </div>
            </div>
        )
    }
}
