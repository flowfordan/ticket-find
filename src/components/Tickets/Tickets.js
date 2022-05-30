import { getTime, getDayOfYear, getDayOfWeek, getDuration } from '../../utils/formatDate';
import styles from './Tickets.module.css';
import { Card } from '../Card/Card';
import { Button } from '../Button/Button';
import { Spinner } from '../Spinner/Spinner';
import arrow from '../../assets/arrow.svg';
import clock from '../../assets/clock.svg';
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator';

const Tickets = ({ticketsData, loadTickets, currentPage, loadedAll, isLoading, isError, ...props}) => {

    const ticketsList = ticketsData
    let renderTickets;
    let renderLoadBtn;
    let errorView;
    let loadingView;
    let dataView;
    
    const onLoadTickets = () => {
        loadTickets()
    }

    if(ticketsList){

        const renderDate = (date, rev = false) => {
            return(
                <span className={styles.ticketTimeDay}>
                    {rev?
                        <>
                        <span className={styles.ticketDay}>{`${getDayOfYear(date)} ${getDayOfWeek(date)}`}</span>
                        <span className={styles.ticketTime}>{getTime(date)}</span>
                        </> 
                        :
                        <>
                        <span className={styles.ticketTime}>{getTime(date)}</span>
                        <span className={styles.ticketDay}>{`${getDayOfYear(date)} ${getDayOfWeek(date)}`}</span>
                        </>    
                    } 
                </span>
            )
        }

        const renderAirportWCity = (city, airport) => {
            return(
                <span>
                    <span className={styles.airport}>
                        {`${city.caption}, ${airport.caption}`}
                    </span>
                    <span className={styles.airportUid}>
                        {` (${airport.uid})`}
                    </span>
                </span>
            )
        }


        renderTickets = ticketsList.map( t => {
        return(
            <Card key={t.flightToken}>
                <div className={styles.ticketData}>
                    <div className={styles.ticketHead}>
                        <img src={t.flight.carrierLogo} alt="airline-logo" className={styles.airlineLogo}/>
                        <span>{`${t.flight.price.total.amount} ₽`} </span>
                    </div>

                    <div className={styles.ticketLegs}>

                        {t.flight.legs.map( (leg, idx) => {
                            return(
                                <div className={styles.ticketLeg} key={idx}>
                                    <div className={styles.ticketFromto}>
                                       {renderAirportWCity(leg.segments[0].departureCity, leg.segments[0].departureAirport)} 
                                        <span className={styles.arrowWrap}>
                                            <span className={styles.arrow}></span>
                                            <span>
                                                <img src={arrow} className={styles.arrowImg} alt="arrow"/>
                                            </span>
                                        </span>
                                        {renderAirportWCity(
                                            leg.segments[leg.segments.length - 1].arrivalCity, 
                                            leg.segments[leg.segments.length - 1].arrivalAirport)}
                                    </div>

                                    <div className={styles.ticketDates}>
                                        {renderDate(leg.segments[0].departureDate)}
                                        <span className={styles.ticketDuration}>
                                            <img src={clock} className={styles.clockImg} alt="arrow"/>
                                            {getDuration(leg.duration)}
                                        </span>
                                        {renderDate(leg.segments[leg.segments.length - 1].arrivalDate, true)}
                                    </div>

                                    <div className={styles.ticketTransfer}>
                                        <span><hr className={styles.ticketTransferLine}/></span>
                                        <span className={styles.ticketTransferText}>
                                            {leg.segments.length - 1 === 0? `без пересадок`: `${leg.segments.length - 1} пересадка`}
                                        </span>
                                        <span><hr className={styles.ticketTransferLine}/></span>
                                    </div>

                                    <div className={styles.ticketAirway}>
                                        {`Рейс выполняет: ${leg.segments[0].airline.caption}`}
                                    </div>

                                    

                                    
                                    
                                    
                                    
                                    
                                </div>
                            )
                        })}
                    </div>
                   
                    <div className={styles.ticketBtnWrap}>
                        <Button appearance='primary'>ВЫБРАТЬ</Button>
                    </div>

                </div>
                
            </Card>
        )
    })
    }
    
     renderLoadBtn = (
    <div>
        <Button onClick={() => {onLoadTickets()}} disabled={loadedAll} appearance='ghost'>
            Загрузить еще
        </Button>
    </div>)

    errorView = (
        <>
        {isError? <ErrorIndicator/> : null}
        </>
    );

    loadingView = (
        <>
        {isLoading? <Spinner /> : null}
        </>
    )

    dataView = (
        <>
        {!isError && !isLoading? renderTickets : null}
        </>
    )


    return(
        <div className={styles.tickets}>
            {errorView}
            {loadingView}
            {dataView}
            {ticketsList && !isLoading? renderLoadBtn : null}
        </div>
    )  
}

export { Tickets }
