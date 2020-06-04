import { getReviewList } from '../services/reviewService.js';

export function fetchReviewList(reviewer) {
    return function (dispatch) {
        getReviewList(reviewer).then(res => {
            if (res && res.status === 200 && res.data.length > 0) {
                dispatch(setReviewList(res.data));
            }
        }).catch(err => {
            console.log('Error in fetching Review List details - ', err);
        });
    }
}

export function setReviewList(reviewList) {
    return {
        type: "SET_REVIEW_LIST",
        reviewList: reviewList
    }
}
