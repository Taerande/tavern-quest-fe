import { Divider } from '@mui/material'

const UserMain = (props) => {
    return (
        // <div>{JSON.stringify(props.data, null, 2)}</div>
        <div>
            <Divider style={{padding:'20px'}} />
            <div className={'subTitle'}>이번주 일정</div>
            <div>
                Upcoming Schedule
            </div>
            <Divider style={{padding:'20px'}} />
            <div className={'subTitle'}>변경된 일정</div>
            <div>
                Updated
            </div>
            <Divider style={{padding:'20px'}} />
            <div className={'subTitle'}>나에게 맞는 스케쥴</div>
            <div>
                Mecernaries
            </div>
        </div>
    )

}

export default UserMain