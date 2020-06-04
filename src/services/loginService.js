import axios from 'axios';

export const doLogin = (loginDetails) => {
     return axios.post('http://localhost:9000/login/doLogin', loginDetails);
}