import { useEffect, useRef } from "react";
import styles from './GuideOverview.module.css'
const Container = () => {
    const options = {
    root: null, // viewport
    rootMargin: "0px",
    threshold: .5,  // 50%가 viewport에 들어와 있어야 callback 실행
    }
    const divRef = useRef();
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
            if (entry.isIntersecting) {
            entry.target.classList.add(styles.guideActive);
            } else {
            entry.target.classList.remove(styles.guideActive);
            }
        });
        }, options);
        const left = document.getElementsByClassName(styles.guideLeft);
        const right = document.getElementsByClassName(styles.guideRight);
        [...left, ...right].forEach(el => observer.observe(el));
    },[]);

    return (<div ref={divRef} className={styles.container}>
        <div className={styles.guideConainer}>
            <div className={styles.guideLeft}>
                <p className={styles.paragraph}>
                    파티를 등록하고 관심있는 파티를 쉽게 찾으세요.<br />
                    스케쥴을 관리하고 기록을 남기세요.<br />
                    급하게 구해야할 인원이 있다면 보상을 등록해보세요.<br />
                </p>
            </div>
            <div className={styles.guideRight}>
                <img src={ require('assets/images/wallpaper/1_cropped.png')} />
            </div>
        </div>
        <div className={`${styles.guideLeft} ${styles.guideConainer}`}>
            <img src={require('assets/images/wallpaper/2_cropped.png')} />
            <p className={styles.paragraph}>
                파티를 등록하고 관심있는 파티를 쉽게 찾으세요.<br />
                스케쥴을 관리하고 기록을 남기세요.<br />
                급하게 구해야할 인원이 있다면 보상을 등록해보세요.<br />
            </p>
        </div>
        <div className={`${styles.guideRight} ${styles.guideConainer}`}>
             <p className={styles.paragraph}>
                파티를 등록하고 관심있는 파티를 쉽게 찾으세요.<br />
                스케쥴을 관리하고 기록을 남기세요.<br />
                급하게 구해야할 인원이 있다면 보상을 등록해보세요.<br />
            </p>
            <img src={require('assets/images/wallpaper/3_cropped.png')} />
        </div>
    </div>)
};

export default Container;