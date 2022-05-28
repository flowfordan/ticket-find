import styles from './Tickets.module.css';
import { Card } from '../Card/Card';
import arrow from '../../assets/arrow.svg'

const Tickets = ({ticketsData, loadTickets, currentPage, loadedAll, ...props}) => {

    const ticketsList = ticketsData
    let renderTickets;
    let renderLoadBtn;

    const preloaderView = 0
    
    const onLoadTickets = () => {
        console.log('load moar')
        loadTickets()
    }

    if(ticketsList){
        renderTickets = ticketsList.map( t => {
        return(
            <Card key={t.flightToken}>
                <div className={styles.ticketData}>
                    <div className={styles.ticketHead}>
                        <div>{t.flight.carrier.caption}</div>
                        <div>{t.flight.price.total.amount} </div>
                    </div>

                    <div className={styles.ticketLegs}>

                        {t.flight.legs.map( leg => {
                            return(
                                <div className={styles.ticketLeg}>
                                    <div className={styles.ticketFromto}>
                                       <span>{`Откуда: ${leg.segments[0].departureAirport.caption}`}</span>
                                            
                                        <span className={styles.arrowWrap}>
                                            <span className={styles.arrow}></span>
                                            <span><img src={arrow} className={styles.arrowImg} alt="arrow"/></span>
                                        </span>
                                           
                                       <span>{`Куда: ${leg.segments[leg.segments.length - 1].arrivalAirport.caption}`} </span>
                                       
                                       
                                    </div>

                                    <div className={styles.ticketDates}>
                                        <span>{leg.segments[0].departureDate}</span>
                                        <span>{leg.duration}</span>
                                        <span>{leg.segments[leg.segments.length - 1].arrivalDate}</span>
                                    </div>

                                    <div className={styles.ticketTransfer}>
                                        <span><hr/></span>
                                        <span>{leg.segments.length - 1 === 0? `без пересадок`: `пересадки ${leg.segments.length - 1}`}</span>
                                        <span><hr/></span>
                                    </div>

                                    <div className={styles.ticketAirway}>
                                        {`Рейс выполняет: ${leg.segments[0].airline.caption}`}
                                    </div>

                                    

                                    
                                    
                                    
                                    
                                    
                                </div>
                            )
                        })}
                    </div>
                   
                    <div className={styles.ticketBtnWrap}>
                        <button>ВЫБРАТЬ</button>
                    </div>

                </div>
                
            </Card>
        )
    })
    }
    
    renderLoadBtn = (
    <div>
        <button onClick={() => {onLoadTickets()}} disabled={loadedAll}>Загрузить еще</button>
    </div>)

    return(
        <div className={styles.tickets}>
            {ticketsList? renderTickets : 'Loading'}
            {ticketsList? renderLoadBtn : null}
        </div>
    )
}

export { Tickets }