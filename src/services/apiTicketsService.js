import flightsData from './flights.json'

export default class TicketsService {

    itemsPerPage = 10;

    ticketsData = flightsData.result.flights;

    getTickets(){

        const currentData = [...this.ticketsData]
        

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(Math.random() > 0.9){
                    reject(new Error('Something wrong')) 
                 }
                //error simulation
                resolve(this._transformTicketsData(currentData))
            }, 700);
        })
    }


    _transformTicketsData(data){
        let flights = data

        //get transfers count per ticket
        for(let i=0; i < flights.length; i++){
            let transfersCount = 0;
            
            for(let j=0; j < flights[i].flight.legs.length; j++){
                if(transfersCount > flights[i].flight.legs[j].segments.length - 1){
                    break
                }
                transfersCount = flights[i].flight.legs[j].segments.length - 1 
                
            }
            flights[i].flight.transfers = transfersCount
        }

        //get airline pics
        for(let i=0; i < flights.length; i++){
            flights[i].flight.carrierLogo = `//pics.avs.io/99/36/${flights[i].flight.carrier.uid}.png`
        }

        return flights
    }
}

// //pics.avs.io/99/36/{IATA_CODE_HERE}.png