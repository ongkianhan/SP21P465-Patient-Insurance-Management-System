import React, { Component } from 'react';
import {Link} from "react-router-dom";

const SUCCESS_COLOR = "#5cb85c";

export default class CustomPopup extends Component 
{
    constructor (props) {
        super(props)
        //Receive the text to place in the popup body
        //and hide the popup
        this.state = {
            headerText: this.props.content,
            content: this.props.content,
            display: "none", /* Style which dictates if the modal is "block" (shown) or "none" (hidden) */
            redirect: this.props.redirect, /* Where to take the user after they click the close button */
            /* ...Pass null for redirect if no redirect is needed*/
        }
    }

    
    //Customize the header
    setHeaderText(inputString) {
        this.setState({headerText: inputString});
    }
    //Customize the message
    setContent(inputString) {
        this.setState({content: inputString});
    }
    //Customize the redirect page
    setRedirect(inputLink) {
        this.setState({redirect: inputLink});
    }
    //Show the modal
    show() {
        this.setState({display: "block"});
    }
    //Close the modal
    hide() {
        this.setState({display: "none"});
    }

    render() 
    {
        //Redirect the user when clicking on the backToDashboardButton
        var backToDashboardButton = <Link to={`${this.state.redirect}`} className="button-popup-confirmation button-primary" onClick={this.hide.bind(this)}>Return to Dashboard</Link>
        
        const {display} = this.state;
        return (
            <div className="modal-scrim" style={{display: display}}>
                <div className="modal-content">
                    <div className="modal-header" style={{ backgroundColor: "#5cb85c" }}>
                        <h2 className="modal-header-text">{this.state.headerText}</h2>
                    </div>
                    <p className="modal-body">{this.state.content}</p>
                    
                    <td> {/*td centers the element*/}
                    {/* Redirect the user when clicking on this button */}
                        <Link to={`${this.state.redirect}`} className="button-primary card-button button-popup-confirmation">
                            Return to Dashboard
                        </Link>
                    </td>
                    <br/>
                </div>
            </div>
        )
    }
}
