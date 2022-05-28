import { useContext, useEffect, useReducer, useState } from 'react';
import styles from './Search.module.css';
import { Filter } from '../Filter/Filter';
import { Tickets } from '../Tickets/Tickets';
import { APIServiceContext } from '../../context/apiContext';
import { sortTickets } from '../../utils/sortTickets';

const Search = () => {


    //tickets to show
    const [tickets, setTickets] = useState(null)

    //currentPage
    const [currentPage, setPage] = useState(1)

    //sorting state - priceUp, priceDown, time
    const [currentSort, setSort] = useState('priceUp')

    //sort function


    
    console.log('currentSort', currentSort)

    const apiTicketsService = useContext(APIServiceContext);

    //om mount
    useEffect(() => {
        apiTicketsService.getTickets()
        .then((data) => {
            console.log(data)
            setTickets(sortTickets(data, currentSort))
        })
        
    },
     [])
    

     //change sort
    useEffect(() => {
        if(tickets){
            
            setTickets(sortTickets(tickets, currentSort))
        }
    }
    , [currentSort])

     //all airlines
     //all prices - min and max
     //all transfers
     //

    const setDataFilters = {
        setSorting: setSort,
    }

    return(
        <div className={styles.search}>

            <div>
                <Filter setDataFilters={setDataFilters} 
            currentSort={currentSort}/>
            </div>
            
            

            <Tickets ticketsData={tickets} />
        </div>
    )
}

export { Search }