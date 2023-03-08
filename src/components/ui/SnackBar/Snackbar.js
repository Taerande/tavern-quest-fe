import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../../../store/ui-slice';

import styles from './Snackbar.module.css'
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js'
import { mdiAlert } from '@mdi/js'
import { mdiCheck } from '@mdi/js'
import { mdiInformation } from '@mdi/js'
import { useEffect } from 'react';



const Snackbar = () => {
    useEffect(() => {
        setTimeout(() => {
            dispatch(uiActions.toggleSnackbar({value:false, message:'',type:''}));
        }, 1500);
    },[])
    const showSnackbarData = useSelector(state => state.ui.snackbar);
    const dispatch = useDispatch();
    const toggleSnackbarHandler = () => {
        dispatch(uiActions.toggleSnackbar({value:false, message:'',type:''}));
    };
    const iconType = () => {
        if(showSnackbarData.snackbarType === 'success'){return mdiCheck}
        else if(showSnackbarData.snackbarType === 'alert'){return mdiAlert}
        else {return mdiInformation}

    }
    return (
        <div className={styles.snackbar} style={{backgroundColor:`var(--${showSnackbarData.snackbarType}-color)`}}>
            <div className={styles.contentBox}>
                <Icon path={iconType()} size={1} color='white' />
                <div className={styles.message}>{ showSnackbarData.snackbarMessage }</div>
            </div>
            <Icon style={{cursor:'pointer'}} onClick={toggleSnackbarHandler} path={mdiClose} color='white' size={1} />
        </div>
    )

}

export default Snackbar