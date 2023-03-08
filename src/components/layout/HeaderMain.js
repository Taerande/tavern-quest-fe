import HeaderSearchBar from './HeaderSearchBar';
import AuthSection from './AuthSection';
import styles from './HeaderMain.module.css'
import LogoSection from './LogoSection';
const HeaderMain = (props) => {
    return (
        <div className={styles['main-panel']}>
           
            <LogoSection/>
            {/* <HeaderSearchBar /> */}
            <AuthSection />
        </div>
    )
}

export default HeaderMain