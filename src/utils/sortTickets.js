const sortTickets = (arr, type) => {
    let sortedArr;
    switch(type){
        case 'priceUp':
            sortedArr = [...arr.sort((a, b) => {
                if(parseInt(a.flight.price.total.amount) > parseInt(b.flight.price.total.amount)){
                    return 1;
                }
                if(parseInt(a.flight.price.total.amount) < parseInt(b.flight.price.total.amount)){
                    return -1;
                }
                return 0
            })]   
            return sortedArr
        case 'priceDown':
            sortedArr = [...arr.sort((a, b) => {
                if(parseInt(a.flight.price.total.amount) > parseInt(b.flight.price.total.amount)){
                    return -1;
                }
                if(parseInt(a.flight.price.total.amount) < parseInt(b.flight.price.total.amount)){
                    return 1;
                }
                return 0
            })]

            return sortedArr

        case 'time':
            sortedArr = [...arr.sort((a, b) => {
                let durationA = 0
                a.flight.legs.forEach(element => {
                    durationA = durationA + parseInt(element.duration)
                });

                let durationB = 0
                b.flight.legs.forEach(element => {
                    durationB = durationB + parseInt(element.duration)
                });

                if(durationA > durationB){
                    return 1;
                }
                if(durationA < durationB){
                    return -1;
                }
                return 0
            })]
            return sortedArr
        default:
            return sortedArr
    }
}

export {sortTickets}