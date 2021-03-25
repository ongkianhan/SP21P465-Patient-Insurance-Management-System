import React, { Component } from 'react';
import {Link} from "react-router-dom";

export default class InvalidUserTypeLanding extends Component 
{
    constructor (props) {
        super(props)
        this.state = {
            content: this.props.content
        }
    }
    
    render() 
    {
        const {display} = this.state;
        return (
            <div className="modal-scrim" style={{display: "block"}}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-header-text">Invalid user type</h2>
                    </div>
                    <p className="modal-body">You cannot access this feature because you are a doctor</p>
                </div>
            </div>
        )
    }
}
