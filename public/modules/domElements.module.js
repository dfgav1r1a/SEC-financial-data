//IDBData is coming from the fn 'getTickersRequest' that executes GET req to IndexedDB's
//"commpanyTickers" obj store

// const datalistFiller = (IDBData) => {
//     const dataDisplay = document.querySelector('#dataDisplay');

//     //cleaning up DOM tree for next data set
//     const previousUlElement = document.querySelector('ul');
//     const previousPElement = document.querySelector('p');
//     if (previousPElement) previousPElement.remove();

//      //To show msg error in page if IDBData is null/undefined
//     if(!IDBData) {
//         const pEle = document.createElement('p');
//         pEle.textContent = "Uh-Oh it seems the ticker symbol is incorrect, please check and try again";
//         dataDisplay.appendChild(pEle);
//     }

//     //adding next data set
//     const ulELe = document.createElement('ul');

//     for (const property in IDBData) {
//         const liEle = document.createElement('li');
//         liEle.textContent = `${property} : ${IDBData[property]}`; 
//         ulELe.appendChild(liEle);
//     }

//     dataDisplay.appendChild(ulELe);
// }

const datalistFiller = (SECData) => {
    const dataDisplay = document.querySelector('#dataDisplay');

    //cleaning up DOM tree for next data set
    const previousPreElement = document.querySelector('pre');
    const previousPElement = document.querySelector('p');
    if (previousPreElement) previousPreElement.remove();
    if (previousPElement) previousPElement.remove();

     //To show msg error in page if IDBData is null/undefined
    if(!SECData) {
        const pEle = document.createElement('p');
        pEle.textContent = "Uh-Oh it seems the ticker symbol is incorrect, please check and try again";
        dataDisplay.appendChild(pEle);
    }

    //adding next data set
    const preELe = document.createElement('pre');
    preELe.textContent = SECData;

    // for (const property in IDBData) {
    //     const liEle = document.createElement('li');
    //     liEle.textContent = `${property} : ${IDBData[property]}`; 
    //     ulELe.appendChild(liEle);
    // }

    dataDisplay.appendChild(preELe);
}

export { datalistFiller };