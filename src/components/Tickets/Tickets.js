import { getTime, getDayOfYear, getDayOfWeek } from '../../utils/formatDate';
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

        const renderDate = (date) => {
            return(
                <span>
                    <span>{getTime(date)}</span>
                    <span>{getDayOfYear(date)}</span>
                    <span>{getDayOfWeek(date)}</span>
                </span>
            )
        }


        renderTickets = ticketsList.map( t => {
        return(
            <Card key={t.flightToken}>
                <div className={styles.ticketData}>
                    <div className={styles.ticketHead}>
                        <div>{t.flight.carrier.caption}</div>
                        <div>{`${t.flight.price.total.amount} ₽`} </div>
                    </div>

                    <div className={styles.ticketLegs}>

                        {t.flight.legs.map( (leg, idx) => {
                            return(
                                <div className={styles.ticketLeg} key={idx}>
                                    <div className={styles.ticketFromto}>
                                       <span>
                                        {`${leg.segments[0].departureCity.caption}, 
                                       ${leg.segments[0].departureAirport.caption} 
                                       (${leg.segments[0].departureAirport.uid})`}</span>
                                            
                                        <span className={styles.arrowWrap}>
                                            <span className={styles.arrow}></span>
                                            <span><img src={arrow} className={styles.arrowImg} alt="arrow"/></span>
                                        </span>
                                           
                                       <span>{`${leg.segments[leg.segments.length - 1].arrivalCity.caption}, 
                                       ${leg.segments[leg.segments.length - 1].arrivalAirport.caption}
                                       (${leg.segments[leg.segments.length - 1].arrivalAirport.uid})`} </span>
                                       
                                       
                                    </div>

                                    <div className={styles.ticketDates}>

                                        {renderDate(leg.segments[0].departureDate)}

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