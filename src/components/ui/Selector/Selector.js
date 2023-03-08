import styles from './Selector.module.css'
import Icon from '@mdi/react'
import { mdiMenuUp } from '@mdi/js'
import { mdiMenuDown } from '@mdi/js'
import { useEffect, useRef, useState } from 'react'

const Selector = ({ placholder, children, id, disabled, onSelect }) => {
    
    // children 은 반드시 value 를 props로 가져야한다.
    const selecotrRef = useRef();
    const [isShow, setIsShow] = useState();
    const [selected, setSelected] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [selectedIndex, setSelectedIndex] = useState();
    const openSelectList = () => {
        setIsShow(!isShow);
    }
    const selectHandler = (v, i) => {
        setIsShow(!isShow);
        setSelected(v);
        setSelectedIndex(i);
        setInputValue(v.props.value);
        onSelect(v.props.value);
    }
    useEffect(() => {
       const handleClickOutside = (event) => {
            if (!selecotrRef.current.contains(event.target)) {
                setIsShow(false);
        }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [])
    

    return (<div ref={selecotrRef} className={styles.selector} style={isShow ? { border: '1px solid var(--primary-color)', borderRadius:'4px' } : {}}>
        <div className={styles.selectionContainer} onClick={openSelectList}>
                {selected ? <div className={styles.selection}>
                    {selected}
                </div> : <div className={styles.selection}></div>}
                <div className={`${styles.placeholder} ${isShow || selected ? styles.isShow : ''}`}>
                    {placholder ? placholder : 'placholder'}
                </div>
                <Icon path={isShow ? mdiMenuUp : mdiMenuDown} size={0.8} />
            </div>
        {isShow && <ul>
            {children.map((v,i) => {
                return <li onClick={()=>selectHandler(v,i)} className={`${i === selectedIndex ? styles.isSelected : ''}`} key={i}>{v}</li>
            })}
        </ul>}
        <input id={id} value={inputValue} readOnly type='text'/>
    </div>)
}

export default Selector