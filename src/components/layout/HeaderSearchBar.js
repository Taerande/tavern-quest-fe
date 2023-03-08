import style from './HeaderSearchBar.module.css'

const HeaderSearchBar = () => {
    return (
        <input className={style.input} placeholder="&#xF002;검색" style={{ fontFamily:'Arial, FontAwesome'
}} ></input>
    )

}
export default HeaderSearchBar