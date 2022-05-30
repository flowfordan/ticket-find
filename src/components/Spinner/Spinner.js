import styles from './Spinner.module.css';
import spinnerAnim from '../../assets/spinner.svg';

export const Spinner = (props) => {

    const {type} = props

    return (
        <div className={styles.wrapper}>
            <img src={spinnerAnim} alt='spinner' 
            className={type === 'small'? styles.img : styles.imgLarge }></img>
            
        </div>
    );
    
};