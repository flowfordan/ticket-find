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
            console.log(sortedArr)    
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
                let durationA
                a.flight.legs.forEach(element => {
                    durationA = durationA + element.duration
                });

                let durationB
                b.flight.legs.forEach(element => {
                    durationB = durationB + element.duration
                });

                if(durationA > durationB){
                    return 1;
                }
                if(durationA < durationB){
                    return -1;
                }
                return 0
            })]
            console.log(sortedArr)
            return sortedArr
        default:
            return
    }
}

export {sortTickets}