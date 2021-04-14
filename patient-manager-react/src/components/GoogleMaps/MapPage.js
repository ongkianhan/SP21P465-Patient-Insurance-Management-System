import React, { Component } from 'react'
import MapContainer from './MapContainer';
import {Link} from "react-router-dom";

export default class MapPage extends Component 
{
    render() {
        return (
            <div className="container">
                <MapContainer lat={this.props.location.latitude} lng={this.props.location.longitude} />
            </div>
        )
    }
}
