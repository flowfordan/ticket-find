const compose =
  (...fns) =>
  (x) =>
    fns.reduceRight((res, fn) => fn(res), x);


//expected options in data[1]
// {
//     transfers: [],
//     priceMin: 0,
//     priceMax: 0,
//     airlines: []
// }
const filterByTransfer = (data) => {
    let filteredTransfers = data[1].transfers;
    let filteredTickets = data[0];
    if(filteredTransfers.length !== 0){
        filteredTickets = filteredTickets.filter( item => {
        return filteredTransfers.includes(item.flight.transfers) 
        })
    }
    
    return [filteredTickets, data[1]]
};

const filterByAirlines = (data) => {
    let filteredAirlines = data[1].airlines;
    let filteredTickets = data[0];
    if(filteredAirlines.length !== 0){
        let filteredUids = [];
        for(let i=0; i< filteredAirlines.length; i++){
            filteredUids.push(filteredAirlines[i].uid)
        }
        filteredTickets = filteredTickets.filter(
            ticket => {
                return filteredUids.includes(ticket.flight.carrier.uid)
            }
        )
    }
    //filteredTickets.flight.carrier.uid
    return [filteredTickets, data[1]]
};

const filterByPriceMin = (data) => {
    let newPriceMin = data[1].priceMin;
    let filteredTickets = data[0];
    if(newPriceMin !== ''){
        filteredTickets = filteredTickets.filter(item => {
            return parseInt(item.flight.price.total.amount) > parseInt(newPriceMin)
        })
    }
    return [filteredTickets, data[1]]
};

const filterByPriceMax = (data) => {
    let newPriceMax = data[1].priceMax;
    let filteredTickets = data[0];
    if(newPriceMax !== ''){
        filteredTickets = filteredTickets.filter(item => {
            return parseInt(item.flight.price.total.amount) < parseInt(newPriceMax)
        })
    }
    return [filteredTickets, data[1]]
};

const filterTickets = compose(
    filterByTransfer,
    filterByAirlines,
    filterByPriceMin,
    filterByPriceMax
);

export {filterTickets}