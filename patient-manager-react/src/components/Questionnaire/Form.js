import React, { Component } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";



class Form extends Component{

    constructor(){
        super();
        this.state={
            errors:{},
            fever:false,
            cough:false,
            difficultBreathing:false,
            fatigue:false,
            aches:false,
            headache:false,
            lossOfTaste:false,
            soreThroat:false,
            congestion:false,
            nausea:false,
            diarrhea:false,
            covid:false,
            submitted:false,
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.checkBoxChange =this.checkBoxChange.bind(this)
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    checkBoxChange(e) {
        this.setState({[e.target.name]: e.target.checked});
    }

    onSubmit(e) {
        e.preventDefault();

        this.setState({submitted:true, covid:this.state.fever 
            || this.state.cough 
            || this.state.difficultBreathing 
            || this.state.fatigue 
            || this.state.aches 
            || this.state.headache 
            || this.state.lossOfTaste
            || this.state.soreThroat
            || this.state.congestion
            || this.state.nausea
            || this.state.diarrhea})



        return this.state.covid
        
    }

    render() {
        const { errors } = this.state;
        return(
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {/*Header*/}
                            {/*<div className="text-left" style={{paddingTop:'2%'}}>
                                <Link to='/choose-role' style={{color:'Green'}}><strong style = {{fontFamily:'Titillium Web'}}>&lt; Go back to role selection</strong></Link>
                            </div>*/}
                            <h5 className="text-left page-header">Please answer a few questions regarding COVID-19 to schedule your appointment</h5>
                            <p className="text-left">This will only take a moment of your time</p>

                            <div className="thin-container">
                                <p className="thin-container-title text-center font-weight-bold">Have you experienced any of the following symptoms in the past 48 hours?</p>

                                <form onSubmit={this.onSubmit}>    
                                    {/*Column 1*/}
                                    <table className="text-left">
                                        <tr>
                                        
                                            <div className="form-group">
                                                <input
                                                    className={classnames(
                                                        "form-check-input"
                                                    )}
                                                    type="checkbox"
                                                    onChange={this.checkBoxChange}
                                                    name="fever"
                                                    id="fever"
                                                ></input>
                                                <label
                                                    className="form-check-label"
                                                >
                                                    fever or chills
                                                </label>
                                            </div>
                                            
                                        </tr>
                                        <tr>
                                           
                                            <div className="form-group">
                                                <input
                                                    className={classnames(
                                                        "form-check-input"
                                                    )}
                                                    type="checkbox"
                                                    onChange={this.checkBoxChange}
                                                    name="cough"
                                                    id="cough"
                                                ></input>
                                                <label
                                                    className="form-check-label"
                                                >
                                                    cough
                                                </label>
                                            </div>
                                            
                                        </tr>
                                        <tr>
                                            
                                            <div className="form-group">
                                                <input
                                                    className={classnames(
                                                        "form-check-input"
                                                    )}
                                                    type="checkbox"
                                                    onChange={this.checkBoxChange}
                                                    name="difficultBreathing"
                                                    id="difficultBreathing"
                                                ></input>
                                                <label
                                                    className="form-check-label"
                                                >
                                                    shortness of breath or difficulty breathing
                                                </label>
                                            </div>
                                            
                                        </tr>
                                        <tr>
                                            
                                            <div className="form-group">
                                                <input
                                                    className={classnames(
                                                        "form-check-input"
                                                    )}
                                                    type="checkbox"
                                                    onChange={this.checkBoxChange}
                                                    name="fatigue"
                                                    id="fatigue"
                                                ></input>
                                                <label
                                                    className="form-check-label"
                                                >
                                                    fatigue
                                                </label>
                                            </div>
                                            
                                        </tr>
                                        <tr>
                                            <div className="form-group">
                                                <input
                                                    className={classnames(
                                                        "form-check-input"
                                                    )}
                                                    type="checkbox"
                                                    onChange={this.checkBoxChange}
                                                    name="aches"
                                                    id="aches"
                                                ></input>
                                                <label
                                                    className="form-check-label"
                                                >
                                                    muscle or body aches
                                                </label>
                                            </div> 
                                        </tr>
                                        <tr>
                                            
                                                <div className="form-group">
                                                    <input
                                                        className={classnames(
                                                            "form-check-input"
                                                        )}
                                                        type="checkbox"
                                                        onChange={this.checkBoxChange}
                                                        name="headache"
                                                        id="headache"
                                                    ></input>
                                                    <label
                                                        className="form-check-label"
                                                    >
                                                        headache
                                                    </label>
                                                </div>
                                            
                                        </tr>
                                        <tr>
                                        <div className="form-group">
                                                    <input
                                                        className={classnames(
                                                            "form-check-input"
                                                        )}
                                                        type="checkbox"
                                                        onChange={this.checkBoxChange}
                                                        name="lossOfTaste"
                                                        id="lossOfTaste"
                                                    ></input>
                                                    <label
                                                        className="form-check-label"
                                                    >
                                                        new loss of taste or smell
                                                    </label>
                                                </div>
                                        </tr>
                                        <tr>
                                        <div className="form-group">
                                                    <input
                                                        className={classnames(
                                                            "form-check-input"
                                                        )}
                                                        type="checkbox"
                                                        onChange={this.checkBoxChange}
                                                        name="soreThroat"
                                                        id="soreThroat"
                                                    ></input>
                                                    <label
                                                        className="form-check-label"
                                                    >
                                                        sore throat
                                                    </label>
                                                </div>
                                        </tr>
                                        <tr>
                                        <div className="form-group">
                                                    <input
                                                        className={classnames(
                                                            "form-check-input"
                                                        )}
                                                        type="checkbox"
                                                        onChange={this.checkBoxChange}
                                                        name="congestion"
                                                        id="congestion"
                                                    ></input>
                                                    <label
                                                        className="form-check-label"
                                                    >
                                                        congestion or runny nose
                                                    </label>
                                                </div>
                                        </tr>
                                        <tr>
                                        <div className="form-group">
                                                    <input
                                                        className={classnames(
                                                            "form-check-input"
                                                        )}
                                                        type="checkbox"
                                                        onChange={this.checkBoxChange}
                                                        name="nausea"
                                                        id="nausea"
                                                    ></input>
                                                    <label
                                                        className="form-check-label"
                                                    >
                                                        nausea or vomiting
                                                    </label>
                                                </div>
                                        </tr>
                                        <tr>
                                        <div className="form-group">
                                                    <input
                                                        className={classnames(
                                                            "form-check-input"
                                                        )}
                                                        type="checkbox"
                                                        onChange={this.checkBoxChange}
                                                        name="diarrhea"
                                                        id="diarrhea"
                                                    ></input>
                                                    <label
                                                        className="form-check-label"
                                                    >
                                                        diarrhea
                                                    </label>
                                                </div>
                                        </tr>
                                    </table>
                                    {/*Submit button*/}
                                    
                                    {this.state.submitted ? 
                                    (this.state.covid ? (<div>might have covid</div>):(<div>no covid</div>))
                                    : 
                                    (<div className="row justify-content-center">
                                        <input
                                            type="submit"
                                            className="button-submit button-primary"
                                            value="Submit"
                                        />
                                    </div>)}

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    errors: state.errors,
    security: state.security,
});

export default Form;