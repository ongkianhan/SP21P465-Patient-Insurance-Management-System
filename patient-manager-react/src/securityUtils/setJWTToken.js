import axios from "axios";

/**
 * Edits the headers sent to any axios request by adding the token value to the "Authorization" key.
 * Significant credit to Agile Intelligence: https://github.com/AgileIntelligence/AgileIntPPMTool/
 */

const setJWTToken = token => {
    if (token)
    {
        axios.defaults.headers.common["Authorization"] = token;
    }
    else
    {
        delete axios.defaults.headers.common["Authorization"];
    }
};

export default setJWTToken;