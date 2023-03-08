import wowSpec from '../../assets/game_data/wowSpecs.json';
import SpecListItem from './SpecListItem';
import styles from './SpecList.module.css'
import Button from '../ui/Button';
import { useState } from 'react';

const Dummy = wowSpec;
const SpecList = (props) => {
    const [filteredList, setFilteredList] = useState(Dummy);
    const [isButtonClicked, setIsButtonClicked] = useState('');

    const isSected = (element) => {
        const idx = props.selectedSpec.findIndex((v) => v.spec === element);
        if (idx > -1) {
            return true;
        }
    }
    const changeTypeHandler = (type) => {
        const filtered = Dummy.filter((v) => v.type === type);
        setIsButtonClicked(type);
        if (filtered.length > 0) {
            setFilteredList(filtered);
        } else {
            setFilteredList(Dummy);
        }
    }
    return (
        <div>
            <div className={ styles.buttons }>
                <Button onClick={()=>changeTypeHandler('')} color={ isButtonClicked === '' ? 'alert' : ''}>All</Button>
                <Button onClick={()=>changeTypeHandler('T')} color={ isButtonClicked === 'T' ? 'alert' : ''}>탱</Button>
                <Button onClick={()=>changeTypeHandler('D')} color={ isButtonClicked === 'D' ? 'alert' : ''}>딜</Button>
                <Button onClick={()=>changeTypeHandler('H')} color={ isButtonClicked === 'H' ? 'alert' : ''}>힐</Button>
            </div>
            <div className={styles.selector}>
                {filteredList.map((v) => {
                    return <SpecListItem selected={isSected(v.spec)} key={v.spec} spec={v.spec} color={v.color} imgUrl={v.imgUrl} onAddSelected={props.onAddSelected} />
                })}
            </div>
        </div>
    )
}
export default SpecList