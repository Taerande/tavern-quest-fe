import axios from "axios"
import cookie from 'js-cookie'
import { getBlizzardAccessToken } from "./partyApi";
export const checkCharacterProfileStatus = async (realm, characterName) => {
    const access_token = cookie.get('blizzard_access_token');
    return await axios.get(`https://kr.api.blizzard.com/profile/wow/character/${realm}/${characterName}/status`, {
        headers: {
            "Authorization": `Bearer ${access_token}`
        },
        params: {
            locale: 'ko_KR',
            namespace:'profile-kr'
        }
    }).then((res) => {
        return res.data.is_valid
    }).catch((err) => {
        return false;
    })
}
export const getCharacter = async (realm, characterName) => {
    const access_token = cookie.get('blizzard_access_token');
    return await axios.get(`https://kr.api.blizzard.com/profile/wow/character/${realm}/${characterName}`, {
        headers: {
            "Authorization": `Bearer ${access_token}`
        },
        params: {
            namespace: 'profile-kr',
            locale: 'ko_KR',
        }
    }).then(async (res) => {
        const data = res.data
        const current_mythic_rating = await axios.get(res.data.mythic_keystone_profile.href, {
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        }).then((res) => res.data.current_mythic_rating === undefined ? 0 : res.data.current_mythic_rating.rating);
        
        const mediaAvatar = await axios.get(res.data.media.href, {
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        }).then((res) => res.data.assets);
        return {
            name: data.name,
            race: data.race.name,
            faction: data.faction.name,
            realm: data.realm.name,
            realm_slug: data.realm.slug,
            character_class: data.character_class.name,
            active_spec: data.active_spec.name,
            guild: data.guild === undefined ? 'none' : `${data.guild.name} - ${data.guild.realm.name}`,
            level: data.level,
            last_login_timestamp: data.last_login_timestamp,
            average_item_level: data.average_item_level,
            equipped_item_level: data.equipped_item_level,
            current_mythic_rating: current_mythic_rating,
            mediaAvatar: mediaAvatar,
        }
    }).catch(async () => {
        await getBlizzardAccessToken().then(async () => {
            await getCharacter(realm, characterName);
        })
    });
}

export const getUserCharacters = async () => {
    const oauth_token = cookie.get('blizzard_oauth_token');
    return await axios.get('https://kr.api.blizzard.com/profile/user/wow', {
        headers: {
            "Authorization": `Bearer ${oauth_token}`
        },
        params: {
            locale: 'ko_KR',
            namespace:'profile-kr'
        }
    }).then((res) => {
        return res.data;
    })
}

export const getOauth = async (code) => {
    let oauth_token = cookie.get('blizzard_oauth_token');
    if (oauth_token) return
    // ${FIREBASE_FUNC_URL}
    await axios.post(`http://localhost:5001/project-tq-aec70/asia-northeast3/blizzardOAuth/oauth_token`, null, {
        params: { "code": code }
    })
    .then((res) => {
        cookie.set('blizzard_oauth_token',res.data.access_token,{expires: 47/48})
    }).catch((er) => {
    })
}
export const getAccessToken = async () => {
    const access_token = cookie.get('blizzard_access_token');
    if (access_token) return
    await axios.post(`http://localhost:5001/project-tq-aec70/asia-northeast3/blizzardOAuth/access_token`).then((res) => {
        cookie.set('blizzard_access_token',res.data.access_token,{expires: 47/48})
    })
}