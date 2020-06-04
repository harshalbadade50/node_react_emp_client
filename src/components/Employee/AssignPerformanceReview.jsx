import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

import { saveReviewData } from '../../services/reviewService.js';

import '../../App.css';

class AssignPerformanceReviewComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
        reviewer: "",
        employee: "",
        email: ""
    }
  }

  reviewerList = () => {
      let optionsList = [];
      this.props.empDetails.forEach(item => {
          let option = <option key={item._id} value={item.email}>
                {item.firstName +" "+ item.lastName}
          </option>;
          optionsList.push(option);
      })
      return optionsList;
  }

  employeeList = () => {
      let optionsList = [];
      this.props.empDetails.forEach(item => {
          let option = <option key={item._id} 
                        value={item.firstName +" "+ item.lastName}
                        empEmail={item.email}
                    >
                {item.firstName +" "+ item.lastName}
          </option>;
          optionsList.push(option);
      })
      return optionsList;
  }

  handleSelect = (event) => {
      let empEmail = "";
      if(event.currentTarget.getAttribute("name") === "employee"){
        let optionsList = event.currentTarget.getElementsByTagName("option");
        for(let i = 0; i <= optionsList.length - 1; i++){
            if(optionsList[i].getAttribute("value") === event.target.value){
                empEmail = optionsList[i].getAttribute("empemail");
                break;
            }
        }
        this.setState({
            [event.target.name]: event.target.value,
            email: empEmail
        })
      } else {
            this.setState({
                [event.target.name]: event.target.value,
            })
      }
  }

  createReview = () => {
          console.log('reivewData - ', this.state);
      if(this.state.reviewer && this.state.employee && this.state.email){
          let reivewData = {
              reviewer: this.state.reviewer,
              firstName: this.state.employee.split(" ")[0],
              lastName: this.state.employee.split(" ")[1],
              requireFeedback: true,
              feedback: "",
              email: this.state.email
          }
          saveReviewData(reivewData);
      }
  }

  render() {
    let reviewerList = this.reviewerList();
    let empList = this.employeeList();
    return (
      <div className="performance-section">
        Assign reviewer to Review the performance of an Employee:
        <div style={{display: "flex", justifyContent: "space-evenly"}}>
            Reviewer
            <select onClick={this.handleSelect} name="reviewer">
                {reviewerList}
            </select>
            
            Employee
            <select onClick={this.handleSelect} name="employee">
                {empList}
            </select>
        </div>
        <div className="assign-reviewer-btn" onClick={this.createReview}>Assign Reviewer</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  empDetails: state.employeeReducer.allEmployees
})

const mapDispatchToProps = {
}

const withRouterAssignPerformanceReviewComponent = withRouter(connect(mapStateToProps, mapDispatchToProps)(AssignPerformanceReviewComponent));
export default withRouterAssignPerformanceReviewComponent;
