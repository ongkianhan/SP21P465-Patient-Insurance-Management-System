import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import {
    GoogleMap,
    LoadScript,
    Marker,
    Polyline,
} from "@react-google-maps/api";
import houseMapMarker from "../../static/houseMapMarker.png";
import hospitalMapMarker from "../../static/hospitalMapMarker.png";
import { getCurrentUser } from "../../actions/userActions";

const mapStyles = {
    height: "95vh",
    width: "100%",
};

//Locations (LatLng values)
var locDestination;
var locYourLocation;
var pathCoordinates;//LatLng[] array

//Markers/map elements
var markerDestination;
var markerYourLocation;


class MapContainer extends Component 
{
    async componentDidMount() 
    {
        //Gets the user's lat/lng location
        await this.props.getCurrentUser(
            this.props.security.user.userId,
            this.props.history
        );

        //Set first marker to destination location
        locDestination = {
            lat: this.props.lat,
            lng: this.props.lng,
        };
        markerDestination = {
            name: "Their Location",
            location: locDestination,
        };

        //Set second marker to user's location
        locYourLocation = {
            lat: this.props.currentUser.currentUser.latitude,
            lng: this.props.currentUser.currentUser.longitude,
        };
        markerYourLocation = {
            name: "Your Location",
            location: locYourLocation,
        };

        //Create an array to store the points on the line to draw
        //between the markers
        pathCoordinates = [locDestination, locYourLocation];
    }

    render() {
        //Return a message if the Map cannot be displayed
        if (markerDestination == undefined || markerYourLocation == undefined) {
            return <span>Loading Google Map...</span>;
        }
        else if (locDestination.lat == 0 && locDestination.lng == 0) {
            return <span>No Google Map is available for this doctor</span>;
        }

        //Render the Map, but exclude user's location from Map if it is not available
        else if (locYourLocation.lat == 0 && locYourLocation.lng == 0) {
            return (
                <LoadScript googleMapsApiKey="AIzaSyDx1alSX-eHys1ZzIMmIyFO07hPmvA_5A8">
                    <GoogleMap
                        mapContainerStyle={mapStyles}
                        zoom={13}
                        center={locDestination}
                    >
                        {/*Marker for other user's location*/}
                        <Marker position={markerDestination.location} />
                    </GoogleMap>
                </LoadScript>
            );
        }

        //Render the full map
        return (
            <LoadScript googleMapsApiKey="AIzaSyDx1alSX-eHys1ZzIMmIyFO07hPmvA_5A8">
                <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={13}
                    center={locDestination}
                >
                    {/*Marker for other user's location*/}
                    <Marker position={markerDestination.location} />

                    {/*Only display the following if the user's location is available:*/}
                    {/*Marker for current user's location*/}
                    <Marker position={markerYourLocation.location} />
                    {/*Straight line to connect the markers*/}
                    <Polyline
                        path={pathCoordinates}
                        options={{
                            strokeColor: "#00aa95",
                            strokeOpacity: 1,
                            strokeWeight: 2
                        }}
                    />
                </GoogleMap>
            </LoadScript>
        );
    }
}

MapContainer.propTypes = {
    getCurrentUser: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    currentUser: state.currentUser,
    security: state.security,
});

export default connect(mapStateToProps, { getCurrentUser })(MapContainer);
