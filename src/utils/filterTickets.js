const filterByTransfer = (arr, options) => {
    let filteredTickets;
    if(options.length === 0){
        return arr
    }
    filteredTickets = arr.filter( item => {
        return options.includes(item.flight.transfers) 
    })
    return filteredTickets 
}


//expected options
// {
//     transfers: [],
//     priceMin: 0,
//     priceMax: 0,
//     airlines: []
// }


const filterTickets = (arr, options) => {
    let filteredTickets;
    if(options.transfers.length === 0){
        return arr
    }
    filteredTickets = arr.filter( item => {
        return options.transfers.includes(item.flight.transfers) 
    })
    return filteredTickets 
}


export {filterByTransfer, filterTickets}