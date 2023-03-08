import { NavLink } from 'react-router-dom';
import AuthSection from './AuthSection';
import styles from './Header.module.css'

const Header = () => {
    return (
        <header className={styles.header}>
            <div style={{display: 'flex', columnGap:'1rem'}}>
                <NavLink to='/' className={styles.navlink}>
                    <img style={{ width: '36px', height: '36px', cursor: 'pointer', borderRadius: '100%' }} src={require('assets/images/logo128.png')} alt="logo_img" />
                    <div style={{textDecoration:'none',color:'var(--primary-color)',fontWeight:'700',fontSize:'1.2rem'
                    }}>TavernQuest</div>
                </NavLink>
                {/* <NavLink to='/worldofwarcraft/schedule' className={(navData) => (navData.isActive ? styles.navactive : styles.navlink)}>
                    <span>Party</span>
                </NavLink>
                <NavLink to='/worldofwarcraft/mercenary' className={(navData) => (navData.isActive ? styles.navactive : styles.navlink)}>
                    <span>Mercenary</span>
                </NavLink> */}
            </div>
            <AuthSection/>
        </header>
        )

}

export default Header;