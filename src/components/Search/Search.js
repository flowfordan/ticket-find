import { useContext, useEffect, useState } from 'react';
import styles from './Search.module.css';
import { Filter } from '../Filter/Filter';
import { Tickets } from '../Tickets/Tickets';
import { APIServiceContext } from '../../context/apiContext';
import { sortTickets } from '../../utils/sortTickets';
import { filterTickets } from '../../utils/filterTickets';

const Search = () => {
    const apiTicketsService = useContext(APIServiceContext);
    const itemsPerPage = 5;

    //observe last page
    const [loadedAll, toggleLoadedAll] = useState(false);
    //currentPage
    const [currentPage, setPage] = useState(1);
    
    //all tickets by search
    const [overallTickets, setAllTickets] = useState(null);
    //filtered or sorted array of all tickets
    const [filteredTickets, setFilteredTickets] = useState(null);
    //tickets to show
    const [tickets, setTickets] = useState(null);

    //sorting state - priceUp, priceDown, time
    const [currentSort, setSort] = useState('priceUp');

    const [currentFilters, setCurrentFilters] = useState(
        {
            transfers: [],
            priceMin: 0,
            priceMax: 0,
            airlines: [],
            chosenAirlines: []
        }
    )
    
    //om mount
    useEffect(() => {
        apiTicketsService.getTickets()
        .then((data) => {
            setAllTickets(data)
            setFilteredTickets(sortTickets(data, currentSort))
        })  
    },
     [])
    

    //filter & sort
    useEffect(() => {
        if(filteredTickets){
            setFilteredTickets(
                sortTickets(
                    filterTickets([overallTickets, currentFilters])[0]
                    , currentSort)
            )
        } 
    },
    [currentFilters, currentSort])

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
    
    return(
        <div className={styles.search}>
            <div>
                <Filter 
                setDataFilters={setDataFilters}
                currentFilters={currentFilters}
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