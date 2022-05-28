import styles from './Filter.module.css';
import { Card } from '../Card/Card';

const Filter = ({currentSort, setDataFilters, foundTickets}) => {

    let renderAirlines;
    //data to construct filters
    const initialFilterData = {
        airlines: [],
        priceMin: 0,
        priceMax: 0,
        transferMax: 0
    }

    if(foundTickets){
        //get all airlines array
       for(let i=0; i < foundTickets.length; i++){
        if(!initialFilterData.airlines.includes(
            foundTickets[i].flight.carrier.uid)){
            initialFilterData.airlines.push(
                foundTickets[i].flight.carrier.uid
            )
        }
    }

    renderAirlines = initialFilterData.airlines.map( a => {
        return(
           <ul key={a}>
                <li>
                    <input type="checkbox" name="subscribe" 
                    value="newsletter"/>Name
                </li>
            </ul> 
        )
    })

        //get possible prices
        for(let i=0; i < foundTickets.length; i++){
            
        }
    console.log(initialFilterData.airlines) 
    }
    
    
    const onSetSort = (e) => {
        setDataFilters.setSorting(e.target.value)
    }


    return(
        <div className={styles.filterWrap}>
            <Card >
                <div className={styles.filter}>
                <div>
                    <div className={styles.h1}>Сортировать</div>
                    <div>
                        <input type="radio" name="sort" value="priceUp" 
                        checked={currentSort === "priceUp"} onChange={(e) => onSetSort(e)}/>
                        <label>по возрастанию цены</label>
                    </div>
                    <div>
                        <input type="radio" name="sort" value="priceDown" 
                        checked={currentSort === "priceDown"} onChange={(e) => onSetSort(e)}/>
                        <label>по убыванию цены</label>
                    </div>
                    <div>
                        <input type="radio" name="sort" value="time" 
                        checked={currentSort === "time"} onChange={(e) => onSetSort(e)}/>
                        <label>по времени в пути</label>
                    </div>
                </div>

                <div>
                    <div className={styles.h1}>Фильтровать</div>
                    <div>
                        <div>
                          <input type="checkbox" id="subscribeNews" name="subscribe" value="newsletter"/>
                            <label>без пересадок</label>  
                        </div>
                        
                        
                        <div>
                            <input type="checkbox" id="subscribeNews" name="subscribe" value="newsletter"/>
                            <label>1 пересадка</label>  
                        </div>
                        
                    </div>

                    <div className={styles.h2}>Цена</div>
                    <div>
                        От:
                        <input type="number" placeholder='0'/>
                    </div>
                    <div>
                        До:
                        <input type="number" placeholder='100000'/>
                    </div>

                    <div className={styles.h2}>Авиакомпании</div>
                    <div>
                        {renderAirlines}
                    </div>
                    
                </div>
                </div>
            </Card>
        </div>
            
        
    )
}

export { Filter }