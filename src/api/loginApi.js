import axios from "axios";
const be_url = process.env.REACT_APP_BE_URL
export const socialLogin = async (provider, code, state) => {
    const response = await axios.post(be_url + `/login/${provider}`, {
        code,
        state
    }, {
    });
    return response;
};