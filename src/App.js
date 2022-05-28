import styles from './App.module.css';
import { Search } from './components';
import tickets from './services/flights.json'

function App() {


  // const ticketObj = JSON.parse(tickets)
  //flights.0.flight.legs.0.stops
  console.log(tickets.result.flights
    .filter(flight => flight.flight.legs
      .filter(leg => leg.segments
        .filter(segment => segment.stops === 1))))
  console.log(tickets.result.flights[0].flight.legs[0].segments[1].stops)
  console.log(tickets.result.flights)

  let companiesArray = []

  for(let i = 0; i < tickets.result.flights.length; i++){
    let currentFlight = tickets.result.flights[i]
    let airCompany = currentFlight.flight.carrier.caption
    if(!companiesArray.includes(airCompany)){
      companiesArray.push(airCompany)
    }
  }

  console.log(companiesArray)

  let stopsArray = []

  for(let i = 0; i < tickets.result.flights.length; i++){

    let currentFlight = tickets.result.flights[i]
    for(let j = 0; j < currentFlight.flight.legs.length; j++){

      let currentLeg = currentFlight.flight.legs[j]
      for(let k = 0; k < currentLeg.segments.length; k++){
        let currentSegment = currentLeg.segments[k]
        if(currentSegment.stops !== 0){
          stopsArray.push(i)
        }
      }

    }
  }

  console.log(companiesArray)
  console.log(stopsArray)

  return (
    <div className={styles.app}>
      <header className={styles.header}>Header</header>
      <Search />
    </div>
  );
}

export default App;
