import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Footer extends Component 
{
    render() {
        return (
            <div className="footer-container">
                <span className="footer-text">
                    © Copyright Vita 2021
                </span>
            </div>
        );
    }
}