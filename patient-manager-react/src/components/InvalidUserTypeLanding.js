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
        var closeButton = <Link to="/dashboard" className="modal-close-button">&times;</Link>

        return (
            <div style={{display: "block"}}>
                <div className="modal-content">
                    <div className="modal-header" style={{ backgroundColor: "#d62b00" }}>
                        <h2 className="modal-header-text">Access Denied</h2>
                        {closeButton}
                    </div>
                    <p className="modal-body">It looks like you don't have permission to access that feature...</p>
                </div>
            </div>
        )
    }
}
