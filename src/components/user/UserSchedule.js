import { getMySchedules } from "api/partyApi"
import Container from "components/ui/Grid/Container"
import LoadingSpinner from "components/ui/LoadingSpinner"
import { useEffect, useState } from "react"
import UserScheduleTable from "./UserScheduleTable"
import {Divider} from '@mui/material'

const UserSchedule = () => {
    const [fetchLoading, setFetchLoading] = useState(true);
    const [ownedSchedules, setOwnedSchedules] = useState([]);
    const [partSchedules, setPartSchedules] = useState([]);
    const [appliedSchedules, setAppliedSchedules] = useState([]);
    useEffect(() => {
        getMySchedules().then((res) => {
            setOwnedSchedules(res.data.ownedSchedules);
            setPartSchedules(res.data.partSchedules);
            setAppliedSchedules(res.data.appliedSchedules);
            setFetchLoading(false);
        })
    }, [])

    return (
        <Container>
            {fetchLoading && <LoadingSpinner />}
            {!fetchLoading &&
                <>
                <Divider style={{padding:'20px'}} />
                <div className={'subTitle'}>생성한 일정</div>
                <UserScheduleTable schedules={ownedSchedules} color='var(--primary-color)' />
                <Divider style={{padding:'20px'}} />
                <div className={'subTitle'}>참가한 일정</div>
                <UserScheduleTable schedules={partSchedules} color='var(--info-color)' />
                <Divider style={{padding:'20px'}} />
                <div className={'subTitle'}>지원한 일정</div>
                <UserScheduleTable disabled={true} schedules={appliedSchedules} color='var(--warning-color)'/>
                </>}
        </Container>
    )
}

export default UserSchedule