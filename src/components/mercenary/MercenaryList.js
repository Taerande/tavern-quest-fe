import Button from "components/ui/Button";
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom";

const MercenaryList = () => {
    const [mercenaries, setMercenaries] = useState([]);
    useEffect(() => {
    
      return () => {
      }
    }, [setMercenaries])
    
    return (
        <>
            {mercenaries.length > 0 ? mercenaries.map((v) => {
                return (
                    <div key={v.id}>{ JSON.stringify(v)}</div>
                )
            }) : 
                    <div style={{position:'absolute', top:'30%', left:'50%', transform:'translate(-50%, -50%)'}}>
                        <div style={{fontSize: '2rem', textAlign:'center', fontWeight:'600'}}>
                            😨 Sorry, We are working on it!
                        </div>
                    <NavLink to='/' style={{display: 'flex', alignItems:'center', textDecoration:'none', justifyContent:'center', width:'fit-content', margin:'auto', padding:'20px'}}>
                            <img style={{ width: '36px', height: '36px', cursor: 'pointer', borderRadius: '100%' }} src={require('assets/images/logo128.png')} alt="logo_img" />
                            <div style={{textDecoration:'none',color:'var(--primary-color)',fontWeight:'700',fontSize:'2rem'
                            }}>Go Home</div>
                    </NavLink>
                </div>
            }
        </>
    )

}

export default MercenaryList