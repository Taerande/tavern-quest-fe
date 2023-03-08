import { MenuItem, Select, ListItemText, Checkbox, OutlinedInput } from "@mui/material"
import { useState } from "react"
import wowSpecs from 'assets/game_data/wowSpecs.json'
import SpecSelector from "components/native/SpecSelector"

const ScheduleRecruit = () => {
    const [recruits, setRecruits] = useState([]);
    return (
        <>
            <SpecSelector data={recruits} onChange={(val) => setRecruits(val)} />
            <input type='hidden' id='specList' value={recruits.map((v) => v.id)} readOnly hidden></input>
        
        </>
    )
}
export default ScheduleRecruit
