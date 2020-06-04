import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import FeedbackModalComponent from "./FeedbackcModalComponent.jsx";

import { fetchReviewList } from '../../actions/reviewListActions.js';
import { updateFeedback } from '../../services/reviewService.js';

import '../../App.css';

class ReviewListComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showFeedbackModal: false,
            selectedReview: null
        }
    }

    componentDidUpdate = (prevProps) => {
        if(prevProps.username !== this.props.username && this.props.username){
            this.props.fetchReviewList(this.props.username);
        }
    }

    openFeedbackModal = (item) => {
        this.setState({
            showFeedbackModal: true,
            selectedReview: item
        })
    }

    hideFeedbackModal = () => {
        this.setState({
            showFeedbackModal: false,
            selectedReview: null
        })
    }

    saveFeedback = (details) => {
        updateFeedback(details).then(res => {
            this.props.fetchReviewList(this.props.username);
            if(res && res.status === 200){
                this.hideFeedbackModal();
            }
        });
    }

    getReviewRows = () => {
        let optionsList = [];
        this.props.reviewList.forEach(item => {
            let option = <tr key={item._id}>
               <td>{item.firstName}</td>
               <td>{item.lastName}</td>
               <td>{item.feedback}</td>
               <td>{(item.requireFeedback) ? "Yes" : "No"}</td>
               <td>{(item.email) ? "Yes" : "No"}</td>
               <td>{item.requireFeedback ? <button onClick={() => this.openFeedbackModal(item)}>Feedback</button>: "N/A"}</td>
            </tr>;
            optionsList.push(option);
        });
        if(this.props.reviewList.length <= 0){
            let emptyRow = <tr>
               <td colSpan="6" style={{textAlign: "center"}}>No Records to Display</td>
            </tr>;
            optionsList.push(emptyRow);
        }
        return optionsList;
    }

    logout = () => {
        this.props.history.push("/");
    }

    render() {
        let reviewRows = this.getReviewRows();
        return (
            <React.Fragment>
                <div className="performance-review-list-section">
                    <button className="logout-btn" onClick={this.logout}>Logout</button>
                    <div>
                        <div>List of Performance Reviews Requiring Feedback</div>
                        <table>
                            <thead>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Feedback</th>
                                <th>Feedback Required</th>
                                <th>Email</th>
                                <th>Action</th>
                            </thead>
                            <tbody>
                                {reviewRows}
                            </tbody>
                        </table>
                    </div>
                </div>

                 {this.state.showFeedbackModal && <FeedbackModalComponent show={this.state.showFeedbackModal}
                        selectedReview={this.state.selectedReview} 
                        hideFeedbackModal={this.hideFeedbackModal}
                        updateFeedback={this.saveFeedback}
                />}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    reviewList: state.reviewListReducer.reviewList,
    username: state.loginReducer.userName
})

const mapDispatchToProps = {
    fetchReviewList
}

const ReviewListComponentContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ReviewListComponent));
export default ReviewListComponentContainer;
