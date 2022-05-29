import styles from './Filter.module.css';
import { Card } from '../Card/Card';
import { constructFilerData } from '../../utils/constructFilterData';

const Filter = ({currentSort, setDataFilters, initTickets, filteredTickets, currentTransferFilter}) => {

    let renderAirlines;
    let renderTransferOptions;
    let renderPrices;

    //data to construct filters
    
    let initialFilterData = {
        airlines: [],
        priceMin: 10000000,
        priceMax: 0,
        transferOptions: [] //from 0- w/out transfers to x  
    };
    let updFilterData;


    if(initTickets){
        
        initialFilterData = constructFilerData(initTickets);
        updFilterData = constructFilerData(filteredTickets)
        console.log(updFilterData)
        
        //RENDER
        //render transfer options list
        renderTransferOptions = initialFilterData.transferOptions.map(
            t => {
                return(
                    <div key={t}>
                        <input type="checkbox" name="transfer" value={t} 
                        onChange={(e) => onSetFilter(e)} checked={currentTransferFilter.includes(t)}/>
                        <label>{t === 0? 'без пересадок' : `${t} пересадка`}</label>  
                    </div>
                )    
            }
        );

        //render airlines list
        
        renderAirlines = initialFilterData.airlines.map( (a, idx) => {
            let airlineActive = updFilterData.airlines.filter( item => {
                return item.uid === a.uid
            })

            //set actual min prices
            let priceActive = a.lowestPrice;
            if(airlineActive.length > 0){
                priceActive = airlineActive[0].lowestPrice
            }

            return(
            <ul key={a.uid}>
                    <li>
                        <input type="checkbox" name="subscribe" 
                        value="newsletter" disabled={airlineActive.length === 0}/>
                        <label>{a.caption}{airlineActive.length === 0? null : `, от ${priceActive} р.`}</label>
                    </li>
                </ul> 
            )
        });

        //render min/max prices placeholders
        renderPrices = (
        <>
        <div>
            От:
            <input type="number" placeholder={initialFilterData.priceMin}/>
        </div>
        <div>
            До:
            <input type="number" placeholder={initialFilterData.priceMax}/>
        </div>
        </>)

    }
    

    //sorting
    const onSetSort = (e) => {
        setDataFilters.setSorting(e.target.value)
    }

    //filter
    const onSetFilter = (e) => {
        //remove or add
        let transfersOptions = parseInt(e.target.value)
        let transferIdx = currentTransferFilter.indexOf(transfersOptions);
        if(transferIdx > -1){
            setDataFilters.setTransferFilter(
                prevArr => [
                    ...prevArr.slice(0, transferIdx),
                    ...prevArr.slice(transferIdx + 1)
                ]
            )
        } else {
            setDataFilters.setTransferFilter(
                prevArr => [...prevArr, transfersOptions]
            )
        }
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
                    <div className={styles.h2}>Пересадки</div>
                    <div>
                        {renderTransferOptions && renderTransferOptions}
                    </div>

                    <div className={styles.h2}>Цена</div>
                        <div>
                            {renderPrices && renderPrices}
                        </div>
                    <div className={styles.h2}>Авиакомпании</div>
                    <div>
                        {renderAirlines && renderAirlines}
                    </div> 
                </div>
                </div>
            </Card>
        </div>
            
        
    )
}

export { Filter }