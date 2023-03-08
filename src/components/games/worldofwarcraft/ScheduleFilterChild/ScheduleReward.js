import { TextField, Switch, FormControlLabel } from "@mui/material";
import { useState } from "react";
const ScheduleReward = () => {

    // Reward Validation

    const [minErrorMessage, setMinErrorMessage] = useState('');
    const [maxErrorMessage, setMaxErrorMessage] = useState('');

    const [minReward, setMinReward] = useState();
    const [maxReward, setMaxReward] = useState();

    const [checkReward, setCheckReward] = useState(false);

    const validateRewardValues = (value, target) => {
        console.log(value, target);
        if (target === 'min' && value*1 > maxReward*1) {
            setMinErrorMessage('error in min')
        }
        if (target === 'max' && value * 1 < minReward * 1) {
            setMaxErrorMessage('Error')
        }


    }
    // const changeMinValue = (e) => {
    //     if (e.target.value.length < 13) {
    //         validateRewardValues(e.target.value, 'min');
    //         setMinReward(e.target.value);
    //     }
    // }
    // const changeMaxValue = (e) => {
    //     if (e.target.value.length < 13) {
    //         validateRewardValues(e.target.value, 'max');
    //         setMaxReward(e.target.value);
    //     }
    // }



    return (
        <>
            <FormControlLabel
                value={checkReward}
                control={<Switch
                    checked={checkReward}
                    onChange={() => {setCheckReward(!checkReward)}}
                    inputProps={{ "aria-label": '' }}
                />}
                label="보상유무"
                labelPlacement="start"
            />
            <div style={{ margin: '16px 0px', display: 'flex', columnGap: '10px', alignItems: 'center' }}>
                <TextField
                    sx={{ width: '10rem' }}
                    id="reward-min"
                    label="최소"
                    disabled={!checkReward}
                    // onChange={changeMinValue}
                    inputProps={{ type: 'number', inputMode: 'numeric', pattern: "^\d{0,12}$" }}
                    helperText={ minErrorMessage }
                />
                <TextField
                    sx={{width:'10rem'}}
                    id="reward-max"
                    label="최대"
                    disabled={!checkReward}
                    // onChange={changeMaxValue}
                    inputProps={{ type: 'number', inputMode: 'numeric', pattern: "^\d{0,12}$" }}
                    helperText={ maxErrorMessage }
                />
            </div>
        </>
    )

}

export default ScheduleReward;