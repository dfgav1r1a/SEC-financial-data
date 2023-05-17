import { datalistFiller } from "./domElements.module.js";

const fetchToSEC = async IDBRecord => {
    //converting the cik number from IDB to a string and then adding zeros at the start of string to accurately generate the CIK for the SEC URL
    const CIKNumber = IDBRecord.cik_str.toString().padStart(10, "0");
    console.log("CIK requested:", CIKNumber);
    // console.log(CIKNumber.length)

    try {
        // const response = await fetch(`https://data.sec.gov/api/xbrl/companyconcept/CIK${CIKNumber}/us-gaap/AccountsPayableCurrent.json`,
        // const response = await fetch(`https://www.sec.gov/files/company_tickers.json`,
        const response = await fetch(`https://data.sec.gov/submissions/CIK${CIKNumber}.json`,
    {
        headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
        "Host": "www.sec.gov",
        "Origin": "www.example.com"
        },
    });
    const data = await response.json();
    console.log(data);
    const prettyData = JSON.stringify(data, null, 2);
    //next, call the helper fn from domElements.module.js to render data in browser
    datalistFiller(prettyData);
    } catch (error) {
        console.error(`Pulling data from the SEC was not successful: ${error.message}`)
    }
}

export {
    fetchToSEC
}