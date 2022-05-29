
const constructFilerData = (itemsArr) => {
    //takes tickets array
    //returns object
    const filterData = {
        airlines: [],
        priceMin: 10000000,
        priceMax: 0,
        transferOptions: [] //from 0- w/out transfers to x  
    }

    //Airlines
    //airlines array
    for(let i=0; i < itemsArr.length; i++){
        let currentAirlines = filterData.airlines.filter(item => {
            return item.uid.indexOf(itemsArr[i].flight.carrier.uid) > -1
        })
        if(currentAirlines.length === 0){
            filterData.airlines.push(itemsArr[i].flight.carrier)   
        }
    }

    //dummy price setup
    for(let i=0; i < filterData.airlines.length; i++){
        filterData.airlines[i].lowestPrice = 999999999999
    }

    //get lowest prices for each airline
    for(let i=0; i < itemsArr.length; i++){

        let currentPrice = Number(itemsArr[i].flight.price.total.amount);
        let currentAirlineId = itemsArr[i].flight.carrier.uid;
        let airlineIdx = filterData.airlines.findIndex(el => el.uid === currentAirlineId);
        let prevPrice = filterData.airlines[airlineIdx].lowestPrice;
        
        if(currentPrice < prevPrice){
            filterData.airlines[airlineIdx].lowestPrice = currentPrice
            prevPrice = currentPrice 
        };
    }

    //Transfers
    //get all transfer options array
    for(let i=0; i < itemsArr.length; i++ ){
        filterData.transferOptions.push(itemsArr[i].flight.transfers)
    }
    filterData.transferOptions = Array
    .from(new Set(filterData.transferOptions))
    .sort();

    //Prices
    //get min/max actual prices for all
    for(let i=0; i < itemsArr.length; i++ ){
        let currentPrice = parseInt(itemsArr[i].flight.price.total.amount)
        if(currentPrice < filterData.priceMin){
            filterData.priceMin = currentPrice
        }
        if(currentPrice > filterData.priceMax){
            filterData.priceMax = currentPrice
        }
    }

    return filterData;
}

export {constructFilerData}