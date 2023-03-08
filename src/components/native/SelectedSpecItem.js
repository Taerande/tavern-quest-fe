import Icon from '@mdi/react'
import { mdiPlus } from '@mdi/js'
import { mdiMinus } from '@mdi/js'
import { mdiCloseCircleOutline } from '@mdi/js'

import styles from './SelectedSpecItem.module.css'
import { useState } from 'react'
const SelectedSpecItem = ({ spec, imgUrl, onRemoveSelectedSpec, color, count, onSelectedSpecCountDown, onSelectedSpecCountUp }) => {
    
    const [isShow, setIsShow] = useState(false);
    const onClickHandler = (e) => {
        onRemoveSelectedSpec(spec)
    }
    const imgMouseOverHandler = (e) => {
        e.stopPropagation();
        if (e.type === 'mouseenter') {
            setIsShow(true);
        } else {
            setIsShow(false);
        }
    }
    return (
        <div className={styles.container} >
            <div className={ styles.name_plate } style={{color:color}}>{spec.split(' ')[0]}</div>
            <div className={ styles.img }>
                <img src={imgUrl} onMouseEnter={imgMouseOverHandler} className={styles.avatar} alt="selected_spec_img" />
                {isShow && <div className={styles.overlay} onMouseLeave={imgMouseOverHandler} onClick={onClickHandler}><Icon path={mdiCloseCircleOutline} size={1}></Icon></div>}
            </div>
        </div>
    )

}
export default SelectedSpecItem