import axios from 'axios'
import Cookies from 'js-cookie';

const be_url = process.env.REACT_APP_BE_URL

export const getScheduleList = async (page) => {
    const response = await axios.get(be_url + `/schedule/list?page=${page ? page : 1}`);
    return response.data;
}

export const getScheduleSearch = async (queries) => {
    console.log(queries);
    const response = await axios.get(be_url + `/schedule${queries}`);
    return response.data;
}

export const loginToLaravel = async (data) => {
    const response = await axios.post(be_url + '/login', {
        ...data
    }, {}).catch(()=>{});
    return response;
}

export const getQuerySchedule = async (queries, page) => {
    let response
    if (Object.keys(queries).length > 0) {
        response = await axios.get(be_url + '/schedule', {
            params: {
                ...queries,
                page: page,
            }
        }).catch(() => { });
    } else {
        response = await axios.get(be_url + `/schedule/list?page=${page ? page : 1}`);
    }
    return response.data;
}

export const getScheduleData = async (scheduleId) => {
    const response = await axios.get(be_url + `/schedule/${scheduleId}`);
    return response.data;
}

export const getScheduleApplicants = async (scheduleId) => {
    const session_cookie = Cookies.get('session_cookie')
    const response = await axios.get(be_url + `/schedule/${scheduleId}/member`, {
        headers: {
            'Authorization': `Bearer ${session_cookie}`
        }
    });
    return response.data;
}


export const getMypageData = async () => {
    const session_cookie = Cookies.get('session_cookie')
    const response = await axios.get(be_url + '/mypage/dashboard', {
        headers: {
            'Authorization': `Bearer ${session_cookie}`
        }
    });
    return response;
}
export const logOutLaravel = async () => {
    const session_cookie = Cookies.get('session_cookie')
    const response = await axios.post(be_url + '/logout', null ,{
        headers: {
            'Authorization': `Bearer ${session_cookie}`
        }
    });
    return response;
}

export const getMyCharaters = async () => {
    const session_cookie = Cookies.get('session_cookie')
    const response = await axios.get(be_url + '/mypage/character', {
        headers: {
            'Authorization': `Bearer ${session_cookie}`
        }
    });
    return response;
}

export const getBlizzardAccessToken = async () => {
    const access_token = Cookies.get('blizzard_access_token');
    if (access_token) return
    await axios.post(be_url + '/blizzard/access_token').then((res) => {
        Cookies.set('blizzard_access_token', res.data.data.access_token, { expires: 47 / 48 });
    })
}

export const getBlizzardOAuthToken = async (code) => {
    let oauth_token = Cookies.get('blizzard_oauth_token');
    if (oauth_token) return
    await axios.post(be_url + '/blizzard/oauth_token', null, {
        params: {
            "code" : code
        }
    }).then((res) => {
        Cookies.set('blizzard_access_token', res.data.data.access_token, { expires: 47 / 48 });
    })
}

export const getMySchedules = async () => {
    const session_cookie = Cookies.get('session_cookie')
    const response = await axios.get(be_url + '/mypage/schedule', {
        headers: {
            'Authorization': `Bearer ${session_cookie}`
        }
    });
    return response;
}

export const updateStatus = async (character_id, schedule_id, status) => {
    const session_cookie = Cookies.get('session_cookie')
    const response = await axios.patch(be_url + '/member/status', {
        character_id,schedule_id,status
    }, {
        headers: {
            'Authorization': `Bearer ${session_cookie}`
        }
    });
    return response;
}

export const checkScheduleIn = async (schedule_id) => {
    const session_cookie = Cookies.get('session_cookie')
    const response = await axios.get(be_url + '/mypage/schedule/check', {
        headers: {
            'Authorization': `Bearer ${session_cookie}`
        },
        params: {
            schedule_id,
        }
    });
    return response;

}

export const applyForSchedule = async (schedule_id, char, comment) => {
    const session_cookie = Cookies.get('session_cookie')
    const response = await axios.post(be_url + `/schedule/${schedule_id}/member`, {
        char,
        comment
    }, {
        headers: {
            'Authorization': `Bearer ${session_cookie}`
        },
    });
    return response;
}
export const getBackEndData = async (schedule_id) => {
    const session_cookie = Cookies.get('session_cookie')
    const response = await axios.get(be_url + `/schedule/${schedule_id}/member`,{
        headers: {
            'Authorization': `Bearer ${session_cookie}`
        },
    });
    return response;
}

export const deleteSchedule = async (schedule_id) => {
    const session_cookie = Cookies.get('session_cookie');
    const response = await axios.delete(be_url + `/schedule/${schedule_id}`,{
        headers: {
            'Authorization': `Bearer ${session_cookie}`
        },
    });
    return response;
}

export const createSchedule = async (data) => {
    const session_cookie = Cookies.get('session_cookie');
    const response = await axios.post(be_url + `/schedule/`, {...data},{
        headers: {
            'Authorization': `Bearer ${session_cookie}`
        },
    });
    return response;
}