import React, { useState } from 'react';
import styles from './InputTextArea.module.css'

const InputTextArea = (props) => {
// validation here props rule for validation
    const [isFilled, setIsFilled] = useState();
    const [isValid, setIsValid] = useState(true);
    const [currentLength, setCurrentLength] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const onInputHandler = (e) => {
        if (props.counter) {
            setCurrentLength(e.target.value.length);
            if (e.target.value.length >= props.counter*1) {
                setIsValid(false);
                setErrorMessage(`최대 ${props.counter}자까지 가능합니다.`);
            } else if (e.target.value.length > props.counter*1) {
                setIsValid(false);
                setErrorMessage(`최대 ${props.counter}자까지 가능합니다.`);
                return
            } else {
                setIsValid(true);
            }
        }
        if (e.target.value.length > 0) {
            setIsFilled(true)
        } else {
            setIsFilled(false)
        }
         if (props.rules !== undefined) {
            for (let rule of props.rules) {
                const result = rule(e.target.value);
                if (!result.result) {
                    setIsValid(result.result);
                    setErrorMessage(result.error);
                    break;
                } else {
                    setIsValid(result.result);
                    setErrorMessage();
                    // props.onChangeTextArea(e.target.value);
                }
            }
        } else {
            // props.onChangeTextArea(e.target.value);
        }
    };
    return (<label htmlFor={props.id} className={styles.inputText}>
        <textarea maxLength={props.counter} className={`${isFilled ? styles.filled : ''} ${!isValid ? styles.error : ''}`} type="text" id={props.id} onInput={onInputHandler}>
        </textarea>
         {props.counter && <span className={`${styles.counter} ${(!isValid || currentLength >= props.counter*1) ? styles.error : ''}`}>
            ({currentLength}/{props.counter})
        </span>}
        <span className={styles.placeholder}>{ props.placeholder }</span>
        {!isValid && <span className={styles.errorMessage}>{errorMessage}</span>}
    </label>)
}


export default React.memo(InputTextArea)