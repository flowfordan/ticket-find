import flightsData from './flights.json'

export default class TicketsService {

    itemsPerPage = 10;

    ticketsData = flightsData.result.flights;

    getTickets(){

        const currentData = [...this.ticketsData]
        

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(currentData)
            }, 700);
        })
    }

}