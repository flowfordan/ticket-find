import styles from './Filter.module.css';
import { Card } from '../Card/Card';

const Filter = () => {

    return(
        <div>
            <Card >
                <div className={styles.filter}>
                <div>
                    <div className={styles.h1}>Сортировать</div>
                    <div>
                        <input type="radio" id="radioButton" name="contact" value="phone"/>
                        <label>fdfdfd</label>
                    </div>
                    <div>
                        <input type="radio" id="radioButton" name="contact" value="phone"/>
                        <label>fdfdfd</label>
                    </div>
                    <div>
                        <input type="radio" id="radioButton" name="contact" value="phone"/>
                        <label>fdfdfd</label>
                    </div>
                </div>

                <div>
                    <div className={styles.h1}>Фильтровать</div>
                    <div>
                        <div>
                          <input type="checkbox" id="subscribeNews" name="subscribe" value="newsletter"/>
                            <label>Subscribe to newsletter?</label>  
                        </div>
                        
                        
                        <div>
                            <input type="checkbox" id="subscribeNews" name="subscribe" value="newsletter"/>
                            <label>Subscribe to newsletter?</label>  
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
                    <ul>
                        <li>
                            <input type="checkbox" id="subscribeNews" name="subscribe" value="newsletter"/>Name
                        </li>
                    </ul>
                </div>
                </div>
            </Card>
        </div>
            
        
    )
}

export { Filter }