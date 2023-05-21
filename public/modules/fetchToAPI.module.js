import { datalistFiller } from "./domElements.module.js";

const fetchToSEC = async IDBRecord => {
    //converting the cik number from IDB to a string and then adding zeros at the start of string to accurately generate the CIK for the SEC URL
    const CIKNumber = IDBRecord.cik_str.toString().padStart(10, "0");
    console.log("CIK requested:", CIKNumber);

    try {
        const response = await fetch(`https://data.sec.gov/submissions/CIK${CIKNumber}.json`,
    {
        headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
        "Host": "www.sec.gov",
        "Origin": "www.example.com"
        },
    });
    const data = await response.json();
    //next, filtering 10k forms, fn in line 32
    const listOf10K = filtered10kData(data);
    const prettyData = JSON.stringify(listOf10K, null, 2);
    //next, call the helper fn from domElements.module.js to render data in browser
    datalistFiller(prettyData);
    } catch (error) {
        console.error(`Pulling data from the SEC was not successful: ${error.message}`)
    }
}

const filtered10kData = ({filings}) => {
    const formsArray = filings.recent.form;
    const existent10KIndexes = []; 
    const filtered10kDataArray = [];
    let form = null;
    let filingDate = null;
    let reportDate = null;
    let primaryDocument = null;
    let accessionNumber = null;
    //looping through formsArray to get the indexes of existent 10-k records
    for(let i = 0; i < formsArray.length; i ++) {
       if (formsArray[i] === '10-K') existent10KIndexes.push(i); 
    }
    console.log('10-K are in indexes', existent10KIndexes);
   //looping through existent10KIndexes to get related data to the indexes saved 
    for(let index of existent10KIndexes) {
        form = filings.recent.form[index];
        filingDate = filings.recent.filingDate[index]; 
        reportDate = filings.recent.reportDate[index]; 
        primaryDocument = filings.recent.primaryDocument[index]; 
        accessionNumber = filings.recent.accessionNumber[index]; 
        filtered10kDataArray.push(new filtered10kObject(form, filingDate, reportDate, primaryDocument, accessionNumber));
    }
    //creating the object with the 10-K formdata. Every single item will correspond to the indexes found in line 43 
    function filtered10kObject(form, filingDate, reportDate, primaryDocument, accessionNumber) {
            this.form = form,
            this.filingDate = filingDate,
            this.reportDate = reportDate,
            this.primaryDocument = primaryDocument,
            this.reportDate = reportDate,
            this.accessionNumber = accessionNumber
    }
    console.log('filtered 10kforms are', filtered10kDataArray);
    return filtered10kDataArray
}

export {
    fetchToSEC
}