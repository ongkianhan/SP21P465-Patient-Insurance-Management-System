import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllSpecializations } from "../../actions/userActions";
import { PropTypes } from "prop-types";

class SpecializationDropdown extends Component 
{
    
    constructor() 
    {
        super();
        this.state = {
            dropdownItems: <span>Loading appointments...</span>
        };
    }

    async componentDidMount() {
        //When the component loads (life cycle method)
        await this.props.getAllSpecializations();
        //Populate the dropdown
        this.generateDropdownList();
    }


    generateDropdownList = () => {
        const allSpecializations = this.props.doctor.allSpecializations;
        
        let dropdownItems = [];
        let uniqueSet = {};
        //Iterate through every specialization from the database
        for (var i = 0; i < allSpecializations.length; i++)
        {
            let specialization = allSpecializations[i];
            //Check if this specialization is already in the dropdown list
            if (!uniqueSet.hasOwnProperty(specialization))
            {
                //Add an item to the dropdown list
                dropdownItems.push(
                    <option key={specialization}>
                        {specialization}
                    </option>
                );

                //Add this specialization to the set
                //so that it does not appear again
                uniqueSet[specialization] = true;
            }
        }
        //Update the UI
        this.setState({ dropdownItems: dropdownItems });
    }

    render() {
        return (
            <div class="dropdown">
                <select className="btn btn-secondary dropdown-toggle" name="cars" id="cars">
                    {this.state.dropdownItems}
                </select>
            </div>
        );
    }
}


SpecializationDropdown.propTypes = {
    doctor: PropTypes.object.isRequired,
    allSpecializations: PropTypes.object.isRequired,
    getAllSpecializations: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    doctor: state.doctor,
    allSpecializations: state.allSpecializations
});

export default connect(mapStateToProps, { getAllSpecializations })(SpecializationDropdown);