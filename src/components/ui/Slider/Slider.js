import { useState } from "react"
import styles from './Slider.module.css'





const Slider = () => {
    const [sliderValue, setSliderValue] = useState(0);
    const sliderHandler = (e) => {
        setSliderValue(e.target.value)
    }
    return (
        <div className={styles.slider}>
            <label htmlFor="slider">Slider</label>
            <input min="0" step="1" max="5" id="slider" data-value={sliderValue} type="range" value={sliderValue} onChange={sliderHandler} list="markers" />
            <datalist id="markers">
                <option value="0">0</option>
                <option value="1">Bad</option>
                <option value="2">SoSo</option>
                <option value="3">Good</option>
                <option value="4">Good</option>
                <option value="5">Good</option>
            </datalist>
        </div>
    )

}

export default Slider