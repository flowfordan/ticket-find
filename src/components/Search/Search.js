import { useContext, useEffect, useState } from 'react';
import styles from './Search.module.css';
import { Filter } from '../Filter/Filter';
import { Tickets } from '../Tickets/Tickets';
import { APIServiceContext } from '../../context/apiContext';
import { sortTickets } from '../../utils/sortTickets';
import { filterByTransfer } from '../../utils/filterTickets';
import { filterTickets } from '../../utils/filterTickets';

const Search = () => {
    const apiTicketsService = useContext(APIServiceContext);
    const itemsPerPage = 5;

    //observe last page
    const [loadedAll, toggleLoadedAll] = useState(false);
    //currentPage
        const [currentPage, setPage] = useState(2);
    
    //all tickets by search
    const [overallTickets, setAllTickets] = useState(null);
    //filtered or sorted array of all tickets
    const [filteredTickets, setFilteredTickets] = useState(null);
    //tickets to show
    const [tickets, setTickets] = useState(null);

    //sorting state - priceUp, priceDown, time
    const [currentSort, setSort] = useState('priceUp');
    //filter transfer state
    const [currentTransfer, setTransferFilter] = useState([]);

    const [currentFilters, setCurrentFilters] = useState(
        {
            transfers: [],
            priceMin: 0,
            priceMax: 0,
            airlines: []
        }
    )
        console.log('STATE FILTER', currentFilters)
    

    //om mount
    useEffect(() => {
        apiTicketsService.getTickets()
        .then((data) => {
            setAllTickets(data)
            setFilteredTickets(sortTickets(data, currentSort))
        })  
    },
     [])
    

    //change sort
    useEffect(() => {
        if(filteredTickets){
            setFilteredTickets(
                sortTickets(filteredTickets, currentSort)
            )
        }
    }
    , [currentSort])

    //filter
    useEffect(() => {
        if(filteredTickets){
            setFilteredTickets(sortTickets(filterTickets(overallTickets, currentFilters), currentSort))
        } 
    },
    [currentFilters])

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

    const loadTickets = () => {
        setPage(prevP => prevP + 1)
    }
    
    const setDataFilters = {
        setSorting: setSort,
        setCurrentFilters: setCurrentFilters,
    }
    
    console.log(filteredTickets)
    
    return(
        <div className={styles.search}>
            <div>
                <Filter 
                setDataFilters={setDataFilters}
                currentFilters={currentFilters}
                currentTransferFilter={currentTransfer} 
                currentSort={currentSort}
                initTickets={overallTickets}
                filteredTickets={filteredTickets}/>
            </div>
            <Tickets 
            ticketsData={tickets} 
            loadTickets={loadTickets}
            loadedAll={loadedAll}/>
        </div>
    )
}

export { Search }