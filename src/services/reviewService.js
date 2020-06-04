import axios from 'axios';

export const saveReviewData = (reviewData) => {
     return axios.post('http://localhost:9000/review/createReview', reviewData);
}

export const getReviewList = (reviewer) => {
    return axios.get('http://localhost:9000/review/getAssignedReviews/'+ reviewer);
}

export const updateFeedback = (reviewData) => {
      return axios.put('http://localhost:9000/review/updateFeedback', reviewData);
}