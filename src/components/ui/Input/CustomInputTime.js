import { useEffect, useRef, useState } from 'react';
import styles from './InputTime.module.css'

const InputTime = () => {
    const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const mins = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
    const [hourIsShow, setHourIsShow] = useState();
    const [minIsShow, setMinIsShow] = useState();
    const [inputHour, setInputHour] = useState();
    // const [isAm, setIsAm] = useState(true);
    // const [inputHour, setInputHour] = useState();
    
    // const hourOnInputHandler = (e) => {
    // let value = e.target.value;
    // if (value < 1) {
    //     value = 0;
    // } else if (value > 11) {
    //     value = 0;
    // }
    // setInputHour(value.toString().substring(value.length - 2).padStart(2, '0'));
    // }

    const hourOnClickHandler = (e) => {
        e.stopPropagation();
        setHourIsShow(!hourIsShow);
    }
    const minOnClickHandler = (e) => {
        e.preventDefault();
        setMinIsShow(!minIsShow);
    }
    const changeHourHandler = (e) => {
        setInputHour(e.target.innerText);
    }
    const hourUpHandler = (e) => {
        e.stopPropagation();
    }
    const listRef = useRef(null);
    useEffect(() => {
        const list = listRef.current;
        if (list) {
            list.addEventListener("scroll", handleScroll);
            return () => {
            list.removeEventListener("scroll", handleScroll);
            }
        }
    }, [hourIsShow, listRef]);
    function handleScroll() {
        const items = document.querySelectorAll("#hour-list li");
        const current = Math.floor(listRef.current.scrollTop / 44);
        for (var i = 0; i < items.length; i++) {
            if (i === current) {
                items[i].classList.add("active");
            } else {
                items[i].classList.remove("active");
            }
        }
    }
    return (
        <div className={styles.timePicker}>
            <div className={styles.timePickerHeader}>Time Picker</div>
            <div className={styles.timePickerMain}>
                <label htmlFor="number-input">
                    <input id="number-input" value={inputHour} type="number" min="0" max="11" pattern="0[0-9]|1[0-1]"  onClick={hourOnClickHandler} />
                    {hourIsShow && <>
                        <div className={styles['controller-up']} onClick={ hourUpHandler }>up</div>
                        <ul ref={listRef} id="hour-list">{
                        hours.map((value) => (
                            <li key={value} onClick={ changeHourHandler}>
                                {value.toString().padStart(2, '0')}
                            </li>
                        ))}
                        </ul>
                        <div className={styles['controller-down']}>down</div>
                        </>
                    }
                </label>
                <span className={styles.divider}>:</span>
                <label htmlFor='number-min'>
                    <input readonly  id="number-min" type="number" pattern="[0-9]*" inputmode="numeric" 
    min="0" max="59" step="5" onClick={minOnClickHandler} />
                    {minIsShow && <ul>{mins.map((value) => (<li key={value}>{value.toString().padStart(2,'0')}</li>))}
                    </ul>}
                </label>
                <div className={styles.ampmSelector}>
                    <div>AM</div>
                    <div>PM</div>
                </div>
            </div>
        </div>

    );
}
export default InputTime