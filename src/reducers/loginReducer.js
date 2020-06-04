const initialState = {
    loginMode: "",
    userName: ""
}

export default function loginReducer(state = initialState, action){
    switch(action.type){
        case "SET_LOGIN_MODE":
            return {
                ...state,
                loginMode : action.loginMode
            }

        case "SET_USERNAME":
            return {
                ...state,
                userName: action.userName
            }
        default:
            return state;
    }
}