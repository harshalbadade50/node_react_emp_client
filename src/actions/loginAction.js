import { doLogin } from '../services/loginService.js';

export function login(logincreds) {
    return function (dispatch) {
        doLogin(logincreds).then(res => {
            if (res && res.status === 200 && res.data.length > 0) {
                dispatch(setLoginMode(res.data[0].role));
                dispatch(setUserName(res.data[0].email));
            }
        }).catch(err => {
            console.log('Error in fetching Employee details - ', err);
        });
    }
}

export function setLoginMode(loginMode) {
    return {
        type: "SET_LOGIN_MODE",
        loginMode: loginMode
    }
}

export function setUserName(userName) {
    return {
        type: "SET_USERNAME",
        userName: userName
    }
}