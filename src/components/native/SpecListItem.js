import React from 'react';
import styles from './SpecListItem.module.css'
const SpecListItem = ({ imgUrl, spec, onAddSelected, selected, color }) => {
    const onClickHandler = (e) => {
        e.stopPropagation();
        onAddSelected(spec);
    }
    return (
        <div className={`${styles.container} ${selected ? styles.selected: ''}`} onClick={ onClickHandler }>
            <div className={ styles.avatar}>
                <img className={ styles.avatar} src={imgUrl} alt="spec_img"/>
            </div>
            <span className={ styles.spec } style={{color:color}}>
                {spec}
            </span>
        </div>
    )
}

export default SpecListItem;