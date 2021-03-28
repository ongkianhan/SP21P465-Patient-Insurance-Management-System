import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Footer extends Component 
{
    render() {
        return (
            <span>
                <nav className="footer-horizontal">
                    <div className="footer-container">
                        <ul className="footer-list">
                            <span className="footer-item">
                                © Copyright Vita 2021
                            </span>
                        </ul>
                    </div>
                </nav>
            </span>
        );
    }
}