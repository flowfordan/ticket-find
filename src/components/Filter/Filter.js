import styles from './Filter.module.css';
import { Card } from '../Card/Card';
import { constructFilterData } from '../../utils/constructFilterData';
import { useState, useEffect } from 'react';

const Filter = ({currentSort, currentFilters, setDataFilters, initTickets, filteredTickets}) => {

    const [priceMin, setPriceMin] = useState('')
    const [priceMax, setPriceMax] = useState('')
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
        
        initialFilterData = constructFilterData(initTickets);
        updFilterData = constructFilterData(filteredTickets);
        
        //RENDER
        //render transfer options list
        if(currentFilters){
          renderTransferOptions = initialFilterData.transferOptions.map(
            t => {
                return(
                    <div key={t} className={styles.filterElement}>
                        <input type="checkbox" name="transfer" value={t}
                        disabled={!updFilterData.transferOptions.includes(t)} 
                        onChange={(e) => onSetTransferFilter(e)} checked={currentFilters.transfers.includes(t)}/>
                        <label>{t === 0? 'без пересадок' : `${t} пересадка`}</label>  
                    </div>
                )    
            }
        );

        //render airlines list
        renderAirlines = initialFilterData.airlines.map( (a, idx) => {

            //check if filters put in airlines
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
                    <li className={styles.filterElement}>
                        <input type="checkbox" name="airline" 
                        value={a.uid} 
                        disabled={airlineActive.length === 0}
                        checked={currentFilters.airlines.findIndex(item => { return item.uid === a.uid }) > -1}
                        onChange={(e) => onSetAirlineFilter(e)}/>
                        <label>{a.caption}{airlineActive.length === 0? null : `, от ${priceActive} р.`}</label>
                    </li>
                </ul> 
            )
        });  
        }
        

        //render min/max prices placeholders
        renderPrices = (
        <>
        <div className={styles.filterElement}>
            От:
            <input type="number" name="priceMin" placeholder={updFilterData.priceMin}
            onChange={(e) => onPriceChange(e)} value={priceMin}/>
        </div>
        <div className={styles.filterElement}>
            До:
            <input type="number" name="priceMax" placeholder={updFilterData.priceMax}
            onChange={(e) => onPriceChange(e)} value={priceMax}/>
        </div>
        </>)

    }
    

    //sorting
    const onSetSort = (e) => {
        setDataFilters.setSorting(e.target.value)
    }

    //filter
    const onSetTransferFilter = (e) => {
        //remove or add transfers
        let transferOption = parseInt(e.target.value)
        let transferIdx = currentFilters.transfers.indexOf(transferOption);
        if(transferIdx > -1){
            setDataFilters.setCurrentFilters(
                prevState => ({...prevState, transfers: 
                    [
                        ...prevState.transfers.slice(0, transferIdx),
                        ...prevState.transfers.slice(transferIdx + 1)
                    ]
                })
            )
        } else {
            setDataFilters.setCurrentFilters(
                prevState => ({
                    ...prevState,
                    transfers: [...prevState.transfers, transferOption]
                })
            )
        }
    }

    //airlines filter
    const onSetAirlineFilter = (e) => {
        let airlineOptionUid = e.target.value; //obj with line data
        let airlineidx = currentFilters.airlines.findIndex(item => {
            return item.uid === airlineOptionUid
        })
        if(airlineidx > -1){
            setDataFilters.setCurrentFilters(
                prevState => ({
                    ...prevState, 
                    airlines: [
                    ...prevState.airlines.slice(0, airlineidx),
                    ...prevState.airlines.slice(airlineidx + 1)
                ]
                })
            )
        }else{
            let airlineOption = initialFilterData.airlines.find(item => {
                return item.uid === airlineOptionUid
            })
            setDataFilters.setCurrentFilters(
                prevState => ({
                    ...prevState,
                    airlines: [...prevState.airlines, airlineOption]
                })
            )
        }
    }

    const onPriceChange = (e) => {
        switch(e.target.name){
            case 'priceMin':
                setPriceMin(e.target.value)
                return;
            case 'priceMax':
                setPriceMax(e.target.value)
                return;
            default:
                return;
        }   
    }

    useEffect(() => {
        setDataFilters.setCurrentFilters(
            prevState => ({
                ...prevState,
                priceMin: priceMin
            })
        )
    }, 
    [priceMin, priceMax])

    useEffect(() => {
        setDataFilters.setCurrentFilters(
            prevState => ({
                ...prevState,
                priceMax: priceMax
            })
        )
    }, 
    [priceMax])

    return(
        <div className={styles.filterWrap}>
            <Card >
                <div className={styles.filter}>
                <div>
                    <div className={styles.h1}>Сортировать</div>
                    <div className={styles.filterSection}>
                        <div className={styles.filterElement}>
                            <input type="radio" name="sort" value="priceUp" 
                            checked={currentSort === "priceUp"} onChange={(e) => onSetSort(e)}/>
                            <label>по возрастанию цены</label>
                        </div>

                        <div className={styles.filterElement}>
                            <input type="radio" name="sort" value="priceDown" 
                            checked={currentSort === "priceDown"} onChange={(e) => onSetSort(e)}/>
                            <label>по убыванию цены</label>
                        </div>

                        <div className={styles.filterElement}>
                            <input type="radio" name="sort" value="time" 
                            checked={currentSort === "time"} onChange={(e) => onSetSort(e)}/>
                            <label>по времени в пути</label>
                        </div>
                    </div>
                </div>

                <div>
                    <div className={styles.h1}>Фильтровать</div>
                    <div className={styles.h2}>Пересадки</div>
                    <div className={styles.filterSection}>
                        {renderTransferOptions && renderTransferOptions}
                    </div>

                    <div className={styles.h2}>Цена</div>
                        <div className={styles.filterSection}>
                            {renderPrices && renderPrices}
                        </div>
                    <div className={styles.h2}>Авиакомпании</div>
                    <div className={styles.filterSection}>
                        {renderAirlines && renderAirlines}
                    </div> 
                </div>
                </div>
            </Card>
        </div>
            
        
    )
}

export { Filter }