import styles from './Filter.module.css';
import { Card } from '../Card/Card';

const Filter = ({currentSort, setDataFilters, initTickets}) => {

    let renderAirlines;
    let renderTransferOptions;
    //data to construct filters
    const initialFilterData = {
        airlines: [],
        priceMin: 0,
        priceMax: 0,
        transferOptions: [] //from 0- w/out transfers to x
    }

    if(initTickets){
        //get all airlines options
       for(let i=0; i < initTickets.length; i++){
        let currentAirlines = initialFilterData.airlines.filter(item => {
            return item.uid.indexOf(initTickets[i].flight.carrier.uid) > -1
        })

        if(currentAirlines.length === 0){
            initialFilterData.airlines.push(initTickets[i].flight.carrier)
        }
        

        

        console.log(currentAirlines)
        console.log(initialFilterData.airlines)
        // if(!initialFilterData.airlines.includes(
        //     )){
        //     initialFilterData.airlines.push(
        //         initTickets[i].flight.carrier.uid
        //     )
        // }
    }

    //get all transfer options array
    for(let i=0; i < initTickets.length; i++ ){
        initialFilterData.transferOptions.push(initTickets[i].flight.transfers)
        
    }
    initialFilterData.transferOptions = Array.from(
        new Set(
            initialFilterData.transferOptions.flat()
        )
    ).sort()
    

    //render transfer options
    renderTransferOptions = initialFilterData.transferOptions.map(
        t => {
            return(
                <div key={t}>
                    <input type="checkbox" name="transfer" value={t}/>
                    <label>{t === 0? 'без пересадок' : `${t} пересадка`}</label>  
                </div>
            )    
        }
    )


    renderAirlines = initialFilterData.airlines.map( (a, idx) => {
        return(
           <ul key={a.uid}>
                <li>
                    <input type="checkbox" name="subscribe" 
                    value="newsletter"/>
                    <label>{a.caption}</label>
                </li>
            </ul> 
        )
    })

        //get possible prices
        for(let i=0; i < initTickets.length; i++){

        }
    console.log(initialFilterData.airlines)
    console.log(initialFilterData.transferOptions) 
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
                        {renderTransferOptions}
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