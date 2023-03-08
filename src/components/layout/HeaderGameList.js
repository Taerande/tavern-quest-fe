import { NavLink } from 'react-router-dom'

import styles from './HeaderGameList.module.css'
const HeaderGameList = () => {
    return (
        <div className={styles} style={{display: 'flex', columnGap:'1rem'}}>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/worldofwarcraft'>Wow</NavLink>
            <NavLink to='/lostark'>Lost ARk</NavLink>
        </div>
    )

}

export default HeaderGameList