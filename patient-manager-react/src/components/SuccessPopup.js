import React, { Component } from 'react';
import {Link} from "react-router-dom";

export default class SuccessPopup extends Component 
{
    constructor (props) {
        super(props)
        //Receive the text to place in the popup body
        //and hide the popup
        this.state = {
            content: this.props.content,
            display: "none", /* Style which dictates if the modal is "block" (shown) or "none" (hidden) */
            redirect: this.props.redirect /* Where to take the user after they click the close button */
            /* Pass null for redirect if no redirect is needed*/
        }

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
        //When the user clicks on <span> (x), close the modal or redirect the user
        var closeButton;
        if (this.state.redirect != null) {
            //Redirect the user version
            closeButton = <Link to={`${this.state.redirect}`} className="modal-close-button" onClick={this.hide.bind(this)}>&times;</Link>
        }
        else {
            //Only close the modal version
            closeButton = <span className="modal-close-button" onClick={this.hide.bind(this)}>&times;</span>
        }

        const {display} = this.state;
        return (
            <div className="modal-scrim" style={{display: display}}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-header-text">Success</h2>
                        {closeButton}
                    </div>
                    <p className="modal-body">{this.state.content}</p>
                </div>
            </div>
        )
    }
}
