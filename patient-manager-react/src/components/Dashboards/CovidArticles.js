import React, { Component } from "react";
import { Link, Router, Route } from "react-router-dom";

var random = 0;

class CovidArticles extends Component{
    constructor(){
        super();
        random = Math.floor(Math.random() * 5); 
    }
    
    render(){
        var articles = {
            //https://www.cdc.gov/mmwr/volumes/70/wr/mm7017e3.htm?s_cid=mm7017e3_x
            0:<div>
                <Link to={`/Covid-Article0`} target="_blank" rel="noopener noreferrer">
                    Health Care Utilization and Clinical Characteristics of Nonhospitalized Adults in an Integrated Health Care System 28–180 Days After COVID-19 Diagnosis — Georgia, May 2020–March 2021
                </Link>
                
            </div>,
            //https://www.cdc.gov/mmwr/volumes/70/wr/mm7016a3.htm?s_cid=mm7016a3_x
            1:<div >
                <Link to={`/Covid-Article1`} target="_blank" rel="noopener noreferrer">
                COVID-19 Outbreaks in Correctional Facilities with Work-Release Programs — Idaho, July–November 2020
                </Link>
                
            </div>,
            //https://www.cdc.gov/mmwr/volumes/70/wr/mm7016a2.htm?s_cid=mm7016a2_x
            2:<div>
                <Link to={`/Covid-Article2`} target="_blank" rel="noopener noreferrer">
                Airport Traveler Testing Program for SARS-CoV-2 — Alaska, June–November 2020
                </Link>
            
            </div>,
            3:<div>
                <Link to={`/Covid-Article3`} target="_blank" rel="noopener noreferrer">
                    Laboratory Modeling of SARS-CoV-2 Exposure Reduction Through Physically Distanced Seating in Aircraft Cabins Using Bacteriophage Aerosol — November 2020
                </Link>

                </div>,
            4:<div>
                <Link to={`/Covid-Article4`} target="_blank" rel="noopener noreferrer">
                COVID-19 Outbreak Associated with a SARS-CoV-2 R.1 Lineage Variant in a Skilled Nursing Facility After Vaccination Program — Kentucky, March 2021

                </Link>
            
            </div>
        };
        return(
            <div class="text-left pb-3">{articles[this.props.index]}</div>
        )
    }
}

export default CovidArticles;