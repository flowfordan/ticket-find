import styles from './Search.module.css';
import { Filter } from '../Filter/Filter';
import { Tickets } from '../Tickets/Tickets';

const Search = () => {

    return(
        <div className={styles.search}>
            <Filter />  
            <Tickets />
        </div>
    )
}

export { Search }