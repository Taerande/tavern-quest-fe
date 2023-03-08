import { useEffect } from 'react'
import styles from './Home.module.css'
import GuideOverview from 'components/home/GuideOverview'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const history = useNavigate();
    useEffect(() => {
        const vid = document.getElementsByTagName('video')[0];
        vid.play();
        // getAccessToken();
        return () => {
        };
    }, []);
    return (
        <div className={styles.container}>
            <div className={styles.home}>
                <video muted loop autoPlay>
                    <source src="https://firebasestorage.googleapis.com/v0/b/tavernquest-4a87c.appspot.com/o/wallpaper%2Fwow_buring_crusade_wall_paper.mp4?alt=media&token=b6f21595-6303-4d16-bca8-526a40a011fb" type="video/mp4" />
                </video>
                    <div className={styles.vidBlur}></div>
                <div className={styles.main}>
                    <h1 className={styles.title}>
                        합류하세요 - Tavern Quest
                    </h1>
                    <div className={styles.cta}>
                        <div className={styles.ctaBtn}>
                            <div onClick={()=> history('/worldofwarcraft/schedule')}>
                                파티 찾기
                            </div>
                        </div>
                        <div className={styles.ctaBtn}>
                            <div onClick={()=> history('/worldofwarcraft/mercenary')}>
                                용병 찾기
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <GuideOverview/>
    </div>
        
    )

}

export default Home