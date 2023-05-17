import { createIndexedDB, getTickersRequest } from "./modules/indexedb.module.js";

const btn = document.getElementById('fetchBtn');
const formBtn = document.querySelector("#getIndexedDBData");

//creating the indexed database with data from the json file, data will be saved locally
btn.addEventListener('click', async () => {
    try {
        const response = await fetch('./data/company_tickers.json');
        console.log('waiting for response...')
        const jsonData = await response.json();

        //calling function to create DB
        createIndexedDB(jsonData);
    } catch (error) {
        console.error(`Something went wrong: ${error.message}`);
    }

    });

//form to get the CIK number from the indexed DB. if GET req successful it will fetch to SEC to get a json file related to the company and the page will show that data if the fetch is successful.
formBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const tickerInput = document.querySelector("#ticker").value;
    const tickerInputToString = tickerInput.toString().toUpperCase();

    //making GET req to IndexedDB
    getTickersRequest(tickerInputToString);
});


