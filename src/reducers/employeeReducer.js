const initialState = {
    allEmployees: []
}

export default function employeeReducer(state = initialState, action){
    switch(action.type){
        case "SET_ALL_EMPLOYEES":
            return {
                ...state,
                allEmployees : action.allEmployees
            }
        default:
            return state;
    }
}