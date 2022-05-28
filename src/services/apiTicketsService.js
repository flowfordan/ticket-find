import flightsData from './flights.json'

export default class TicketsService {

    itemsPerPage = 10;

    ticketsData = flightsData.result.flights;

    getTickets(){

        const currentData = [...this.ticketsData]
        

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this._transformTicketsData(currentData))
            }, 700);
        })
    }


    _transformTicketsData(data){
        let flights = data
        for(let i=0; i < flights.length; i++){
            let transfersCount = [];
            
            for(let j=0; j < flights[i].flight.legs.length; j++){
                if(transfersCount.includes(flights[i].flight.legs[j].segments.length - 1)){
                    break
                }
                transfersCount.push(flights[i].flight.legs[j].segments.length - 1) 
                
            }
            flights[i].flight.transfers = transfersCount
        }
        return flights
    }
}