import styles from './Button.module.css';
import cn from 'classnames';

export const Button = (props) => {

    const {appearance, children, ...rest} = props;

    return (
        <>
            <button className={cn(styles.button, {
                [styles.primary]: appearance === 'primary',
                [styles.ghost]: appearance === 'ghost',
            })}
            {...rest}>
                {children}
                {/* {isLoading? <Spinner /> : children} */}
                
            </button>
        </>
    );
    
};