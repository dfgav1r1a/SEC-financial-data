import { datalistFiller } from "./domElements.module.js";
import { fetchToSEC } from "./fetchToAPI.module.js";

//function to handle the creation of indexedDB
const createIndexedDB = (fetchedData) => {

    //handling different versions of IndexedDB in browsers
    const indexedDB = 
        window.indexedDB ||
        window.mozIndexedDB ||
        window.webkitIndexedDB ||
        window.msIndexedDB ||
        window.shimIndexedDB;

    //creating indexedDB
    const openDBRequest = indexedDB.open("tickerSymbolsDB");

    //handling error if creating db was not successful
    openDBRequest.onerror = e => {
        console.error(`Creating the IndexedDB failed: ${e.target.error}`);
    };

    //creating object store inside DB
    openDBRequest.onupgradeneeded = e => {
        const DB = e.target.result;

        const tickerObjectStore = DB.createObjectStore('companyTickers', { keyPath: "ticker", autoincrement: true });
        tickerObjectStore.createIndex("cik_str", "cik_str", { unique: false});
        tickerObjectStore.createIndex("ticker", "ticker", { unique: true});
        tickerObjectStore.createIndex("title", "title", { unique: false});
    }

    openDBRequest.onsuccess = e => {
        console.log('IndexedDB was created successfully!')
        const DB = e.target.result;
        const DBTransaction = DB.transaction(["companyTickers"], "readwrite");
        const tickerObjStore = DBTransaction.objectStore("companyTickers");
        
        //adding data to the companyTickers obj store
        Object.values(fetchedData).forEach( company => {
            tickerObjStore.add(company);
        });
       
        DBTransaction.onerror = (e) => {
            console.log(`Transaction on the object store "companyTickers" was not successful. ${e.target.error}`)
        }

        DBTransaction.oncomplete = (e) => {
            console.log(`Adding data to the object store "companyTickers" was successfully executed.`);
        }
    }
}

//get requests using ticker symbols
const getTickersRequest = (ticker) => {
    const openDBRequest = indexedDB.open('tickerSymbolsDB');

    openDBRequest.onerror = e => {
        console.log('The request to open the DB failed, try again in a moment');
    }

    openDBRequest.onsuccess = e => {
        const DB =  e.target.result;
        const DBReadTransaction = DB.transaction(["companyTickers"], "readonly");
        const tickerObjectStore = DBReadTransaction.objectStore("companyTickers");
        const readRequest = tickerObjectStore.get(ticker);

        readRequest.onerror = e => {
            console.error(`Read request failed: ${e.target.error}`);
        }

        readRequest.onsuccess = e => {
            console.log('Get req to DB was successful')
            const getQueryResult = e.target.result;

            if (!getQueryResult) {
                console.error("Ticker is not in the database please check and try again");
                datalistFiller(getQueryResult);
            } else {
                console.log(getQueryResult);
                // datalistFiller(getQueryResult);
                fetchToSEC(getQueryResult);
            }
        }
    }
}

export { createIndexedDB,
         getTickersRequest   
};

