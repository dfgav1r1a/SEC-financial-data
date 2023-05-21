//IDBData is coming from the fn 'getTickersRequest' that executes GET req to IndexedDB's
//"commpanyTickers" obj store

const datalistFiller = (SECData) => {
    //SECData is coming as a string from fetchToApi module
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

    dataDisplay.appendChild(preELe);
}

export { datalistFiller };