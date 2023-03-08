import Card from '../ui/Card/Card';
import CardHeader from '../ui/Card/CardHeader';
import CardContent from '../ui/Card/CardContent';
import CardAction from '../ui/Card/CardAction';
import { useNavigate } from 'react-router-dom';
import ApplySchedule from './ApplySchedule';

const ScheduleItem = (props) => {
    const history = useNavigate();

    const cardClickHandler = (e) => {
        history(`/worldofwarcraft/schedule/${props.data.id}`);
    }
    return (
        <>
            <Card onClick={cardClickHandler} hover={true}>
                <CardHeader color="primary" textColor="white">
                    <div style={{display:'flex',alignItems:'center'}}>
                        <img style={{width:'36px',height:'36px',borderRadius:'50%'}} src={require('assets/images/wow_logo.png')} alt='sync_wow' />
                        <span>{props.data.title}</span>
                    </div>
                </CardHeader>
                <CardContent>
                    <div>
                        Dungeon Info
                    </div>
                    <div className='line2'>
                        {props.data.description}
                    </div>
                    <div>
                        <div>recruits</div>
                        <div>
                            {props.data.recruit.map((v) => {
                                return <img key={v.spec} style={{width:'36px',height:'36px',borderRadius:'50%',margin:'2px'}} src={v.imgUrl} alt="recruit_spec_img" />
                            })}
                        </div>
                    </div>
                    <div>
                        
                    </div>
                </CardContent>
                <CardAction>
                    <ApplySchedule data={ props.data } />
                </CardAction>
            </Card>
        </>
    )
}

export default ScheduleItem