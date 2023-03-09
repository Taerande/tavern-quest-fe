import { useNavigate, useSearchParams } from "react-router-dom"
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from "react"
import { getQuerySchedule } from "api/partyApi"
import { Pagination } from "@mui/material"
import styles from './ScheduleMain.module.css'
import wowSpecs from 'assets/game_data/wowSpecs.json'
import LoadingSpinner from "components/ui/LoadingSpinner";
import RecruitItem from "components/schedule/RecruitItem";
import wowDungeons from 'assets/game_data/wowDungeons.json'
import ScheduleQueryView from "components/games/worldofwarcraft/ScheduleFilterChild/ScheduleQueryView";
import ApplySchedule from "components/schedule/ApplySchedule";


let allInstances = [];
wowDungeons.map((v) => { return allInstances = [...allInstances, ...v.instances] });

const dateTimeFormatter = (dateTime) => {
    let date = new Date(dateTime);
    let options = {
        dateStyle: 'long',
        timeStyle: 'long',
    }
    let formatter = new Intl.DateTimeFormat('ko-KR',options);
    return formatter.format(date).toString();
}

const ScheduleMain = () => {
    const history = useNavigate();
    const [searchParams] = useSearchParams();
    const [fetchData, setFectchData] = useState();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [queryObj, setQueryObj] = useState({});
    useEffect(() => {
        window.scrollTo(0, 0);
        let queries = {};
        let recruitQ = [];
        searchParams.forEach((value, key) => {
            if (key.includes('recruit') && !recruitQ.includes(value)) {
                recruitQ.push(value);
            }
            if (!key.includes('recruit')) {
                queries[key] = value;
            }
        })
        if (recruitQ.length > 0) {
            queries.recruit = recruitQ;
        }
        getQuerySchedule(queries, null).then((res) => {
            res.data.map(v => v.recruit = v.recruit.map(element => wowSpecs.find(val => val.id === element)));
            setQueryObj(queries);
            setFectchData(res);
            setLoading(false);
        }).catch(() => history('/worldofwarcraft/schedule'));
    }, [setFectchData, searchParams, history]);
    const pageChangeHandelr = (e, v) => {
        setLoading(true);
        window.scrollTo(0, 0);
        setFectchData();
        setPage(v);
        setTimeout(() => {
            getQuerySchedule(queryObj,v).then((res) => {
             res.data.map(v => 
                v.recruit = v.recruit.map((element) => {
                    return wowSpecs.find(val => val.id === element);
                })
            )
            setFectchData(res);
            setLoading(false);
        })
        }, 0);
    }
    return (
        <div className={styles.container}>
            {loading && <LoadingSpinner />}
            {!loading && <>
                {Object.keys(queryObj).length > 0 && <ScheduleQueryView queries={ queryObj } instanceDB={allInstances} />}
            <Grid container>
                {fetchData.data.length > 0 && fetchData.data.map((v) => {
                    return (
                        <Grid item key={v.id} style={{ width:'100%', margin: '16px'}} >
                            <Card className={ styles.scheduleContainer} sx={{ p: 2, }} onClick={() => history(`/worldofwarcraft/schedule/${v.id}`)} style={{cursor:'pointer'}}>
                                <div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent:'space-between',alignItems: 'center'
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            <img style={{width:'36px',height:'36px',borderRadius:'50%'}} src={require('assets/images/wow_logo.png')} alt='sync_wow' />
                                            <span>{v.title}</span>
                                        </div>
                                        <div>
                                            {dateTimeFormatter(v.created_at)}
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', padding:'8px' }}>
                                        <div style={{display:'flex',columnGap:'8px'}}>
                                            <Chip size='small' label={ allInstances.find(el => el.id === v.dungeon).name } />
                                            <Chip size='small' label={ v.difficulty } />
                                            <Chip size='small' label={ v.goal } />
                                        </div>
                                        <div stlye={{fontStyle: 'italic', fontSize:'12px'}}>{ v.characters[0].name }</div>
                                    </div>
                                    <div>
                                        {v.start} ~ { v.end }
                                    </div>
                                </div>
                                <CardContent>
                                    <div className='line2'>
                                        {v.description}
                                    </div>
                                    <div>
                                        <div>recruits</div>
                                        <div className={styles.recruit}>
                                            {v.recruit.map((item) => {
                                                return <RecruitItem id={item.id} spec={item.spec} color={item.color} imgUrl={item.imgUrl} key={item.id} />
                                            })
                                            }
                                        </div>
                                    </div>
                                </CardContent>
                                <CardActions>
                                    <ApplySchedule data={ v } />
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                })}
                    {fetchData.data.length === 0 && <div className={styles.notFound}>
                        🤐 만족하는 파티가 없습니다.
                </div>}
            </Grid>
            {<Pagination sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',padding:'30px 0px'}} size='large' variant="outlined" shape="rounded" count={fetchData.last_page} page={page} onChange={pageChangeHandelr} color="primary" />}
            </>}
        </div>
    )
}
export default ScheduleMain