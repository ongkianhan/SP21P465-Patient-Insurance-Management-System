import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllSpecializations } from "../../actions/userActions";
import { PropTypes } from "prop-types";

const NO_PREFERENCE_OPTION = "No preference";

class SpecializationDropdown extends Component 
{
    
    constructor() 
    {
        super();
        this.state = {
            dropdownItems: <span>Loading items...</span>
        };
    }

    async componentDidMount() {
        //When the component loads (life cycle method)
        await this.props.getAllSpecializations();
        //Populate the dropdown
        this.generateDropdownList();
    }


    generateDropdownList = () => {
        if (this.props.doctor == null) return;
        const allSpecializations = this.props.doctor.allSpecializations;
        
        //Prepare the dropdown list
        let dropdownItems = [];
        let uniqueSet = {};
        //Add the default item to the dropdown list
        dropdownItems.push(
            <option key={allSpecializations.length} onChange={this.handleSelectItem.bind(this)}>
                {NO_PREFERENCE_OPTION}
            </option>
        );

        //Iterate through every specialization from the database
        for (var i = 0; i < allSpecializations.length; i++)
        {
            let specialization = allSpecializations[i];
            //Check if this specialization is already in the dropdown list
            if (!uniqueSet.hasOwnProperty(specialization))
            {
                //Add an item to the dropdown list
                dropdownItems.push(
                    <option key={i}>
                        {specialization}
                    </option>
                );

                //Add this specialization to the set so that it does not appear again
                uniqueSet[specialization] = true;
            }
        }
        //Update the UI
        this.setState({ dropdownItems: dropdownItems });
    }

    handleSelectItem(event)
    {
        const selectedOption = event.target.value;
        this.props.setSpecialization(selectedOption);
    }

    render() {
        return (
            <div className="dropdown">
                <select className="btn btn-secondary dropdown-toggle" onChange={this.handleSelectItem.bind(this)}>
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