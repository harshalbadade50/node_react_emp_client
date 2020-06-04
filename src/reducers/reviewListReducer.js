const initialState = {
    reviewList: []
}

export default function reviewListReducer(state = initialState, action){
    switch(action.type){
        case "SET_REVIEW_LIST":
            return {
                ...state,
                reviewList : action.reviewList
            }
        default:
            return state;
    }
}