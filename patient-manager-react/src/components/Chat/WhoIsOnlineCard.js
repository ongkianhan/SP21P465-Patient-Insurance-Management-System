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

    
    render() 
    {
        return (
            <div className="row online-card-container">
                <div className="col-2 online-status-icon-container">
                    {this.props.isOnline == true ? (
                        <img src={onlineIcon} className="online-status-icon"/>
                    ) : (
                        <img src={offlineIcon} className="online-status-icon"/>
                    )}
                </div>                
                <div className="col-10 online-title">
                    {/*List the first/last names of the users in this group chat, excluding the current user*/}
                    {this.props.personName}
                </div>
            </div>
        )
    }
}
