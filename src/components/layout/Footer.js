import styles from './Footer.module.css'
import { NavLink } from 'react-router-dom'
const Footer = () => {
    return (<footer className={styles.footer}>
        <div className={styles.sitemap}>
            <NavLink className={(navData)=>(navData.isActive ? styles.navActive : '')} to={'/'}>개인정보처리방침</NavLink>
            <NavLink className={(navData)=>(navData.isActive ? styles.navActive : '')} to={'/'}>이용약관</NavLink>
            <NavLink className={(navData)=>(navData.isActive ? styles.navActive : '')} to={'/'}>사이트맵</NavLink>
        </div>
        <div>
            Company Details
        </div>
        <div>
            ⓒ 2023 Tavern Quest. All Rights Reserved.
        </div>
    </footer>)
}

export default Footer