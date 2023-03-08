import { useNavigate } from "react-router-dom"
import MercenaryList from "components/mercenary/MercenaryList";
import Button from "components/ui/Button"
import MercenaryFilter from "components/mercenary/MercenaryFilter";
const MercenariesWOW = () => {
    const history = useNavigate();
    // const createScheduleRouter = () => {
    //     history('/worldofwarcraft/mercenary/register')
    // }
    return <>
        {/* <MercenaryFilter/>
        <Button onClick={ createScheduleRouter }>Register</Button> */}
        <MercenaryList/>
    </>
}
export default MercenariesWOW