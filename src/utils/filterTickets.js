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

export {filterByTransfer}