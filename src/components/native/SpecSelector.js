import styles from './SpecSelector.module.css';
import wowSpec from '../../assets/game_data/wowSpecs.json';
import SpecList from './SpecList';
import SelectedSpecItem from './SelectedSpecItem';
import Icon from '@mdi/react';
import { mdiRefresh } from '@mdi/js';

const SpecSelector = (props) => {
    const state = props.data;

    const addToSelectedHandler = (e) => {
        const isIncluded = props.data.findIndex((element) => element.spec === e);
        if (isIncluded === -1) {
            const spec = wowSpec.find((element) => element.spec === e);
            props.onChange([...state, {...spec, count:1}])
        } else {
            state.splice(isIncluded, 1);
            props.onChange([...state]);
        }
    };
    const resetAllSelected = () => {
        props.onChange([]);
    }
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div style={{display:'block', width:'100%'}}>
                    <div className={styles.controller}>
                        <Icon style={{cursor:'pointer'}} path={mdiRefresh} size={1} onClick={ resetAllSelected } />
                    </div>
                    <div className={styles.selected}>
                        {props.data.length > 0 &&  props.data.map((v,i) => {
                            return <SelectedSpecItem key={v.spec} spec={v.spec} imgUrl={v.imgUrl} color={v.color} count={v.count}
                            onRemoveSelectedSpec={addToSelectedHandler} />
                        })}
                        {props.data.length === 0 && <p>Nothing selected</p>}
                    </div>
                </div>
                <SpecList selectedSpec={props.data} onAddSelected={ addToSelectedHandler } />
            </div>
        </div>
    )

}

export default SpecSelector;