import { useContext, useEffect, useState } from 'react';
import styles from './Search.module.css';
import { Filter } from '../Filter/Filter';
import { Tickets } from '../Tickets/Tickets';
import { APIServiceContext } from '../../context/apiContext';
import { sortTickets } from '../../utils/sortTickets';

const Search = () => {

    const itemsPerPage = 5;
    const [loadedAll, toggleLoadedAll] = useState(false)

    //all tickets by search
    const [overallTickets, setAllTickets] = useState(null)

    //filtered or sorted array of all tickets
    const [filteredTickets, setFilteredTickets] = useState(null)

    //tickets to show
    const [tickets, setTickets] = useState(null)

    //currentPage
    const [currentPage, setPage] = useState(2)

    //sorting state - priceUp, priceDown, time
    const [currentSort, setSort] = useState('priceUp')

    //sort function


    
    console.log('currentSort', currentSort)

    const apiTicketsService = useContext(APIServiceContext);

    //om mount
    useEffect(() => {
        apiTicketsService.getTickets()
        .then((data) => {
            setFilteredTickets(sortTickets(data, currentSort))
            setAllTickets(data)
        })
        
    },
     [])
    

     //change sort
    useEffect(() => {
        if(tickets){
            setFilteredTickets(sortTickets(tickets, currentSort))
        }
    }
    , [currentSort])

    //set tickets to render - according to page
    useEffect(() => {
        if(filteredTickets){
            let lastEl = itemsPerPage * currentPage
            setTickets(filteredTickets.slice(0, lastEl))
            
        }
    }
    , [filteredTickets, currentPage])

    useEffect(() => {
        if(tickets && filteredTickets){
           toggleLoadedAll(tickets.length === filteredTickets.length) 
        }
    }, [tickets])

    // useEffect(() => {
    //     setPage(1)
    // }, [])
     //all airlines
     //all prices - min and max
     //all transfers
    const loadTickets = () => {
        setPage(prevP => prevP + 1)
    }
    

    const setDataFilters = {
        setSorting: setSort,
    }


    console.log(currentPage)

    
    
    return(
        <div className={styles.search}>

            <div>
                <Filter 
                setDataFilters={setDataFilters} 
                currentSort={currentSort}
                foundTickets={overallTickets}/>
            </div>
            
            

            <Tickets 
            ticketsData={tickets} 
            loadTickets={loadTickets}
            loadedAll={loadedAll}/>
        </div>
    )
}

export { Search }