import React, { Component } from 'react'

export default class SuccessPopup extends Component 
{
    constructor (props) {
        super(props)
        //Receive the text to place in the popup body
        //and hide the popup
        this.state = {
            content: this.props.content,
            display: "none"
        }

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
        //When the user clicks on <span> (x), close the modal
        var closeButton = (
            <span className="modal-close-button" onClick={this.hide.bind(this)}>&times;</span>
        )

        const {display} = this.state;
        return (
            <div className="modal-scrim" style={{display: display}}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-header-text">Success</h2>
                        {closeButton}
                    </div>
                    <p className="modal-body">{this.props.content}</p>
                </div>
            </div>
        )
    }
}
