import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';

import AddEmployeeComponent from './AddEmployeeComponent.jsx';
import EmployeeTableComponent from './EmployeeTableComponent.jsx';
import AssignPerformanceReviewComponent from './AssignPerformanceReview.jsx';
import history from '../history.js';

import { getAllEmployees } from '../../services/employeeService.js';
import { fetchAllEmployees } from '../../actions/employeeAction.js';

import '../../App.css';

const styles = theme => ({
    tabsIndicator: {
        backgroundColor: "green"
    }
})

class EmployeeComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 1
        }
    }

    componentDidMount = () => {
        // fetch list of all employees
        this.props.fetchAllEmployees();
    }

    logout = () => {
        // logout and route to login component
        this.props.history.push("/");
    }

    handleTabChange = (event, value) => {
        // change the Tab Index
        this.setState({
            tabIndex: value
        })
    }

    render() {
        return (
            <div className="employee-section">
                <button className="logout-btn" onClick={this.logout}>Logout</button>

                <div id="tab-container" style={{ backgroundColor: "white", width: "50%", margin: "0 auto" }}>
                    <Tabs id="tab-bar" value={this.state.tabIndex}
                        classes={{ indicator: this.props.classes.tabsIndicator }}
                        onChange={this.handleTabChange}
                        >
                        <Tab value={1} label="Add Employee" style={{ flex: 1 }}></Tab>
                        <Tab value={2} label="Employee List" style={{ flex: 1 }}></Tab>
                        <Tab value={3} label="Create Review" style={{ flex: 1 }}></Tab>
                    </Tabs>
                    
                    {/* Display Add Employee Component */}
                    <div style={{ display: this.state.tabIndex === 1 ? "block" : "none", background: "#f8f9f2a6"}}>
                        <AddEmployeeComponent />
                    </div>
                   
                    {/* Display the List of Employees Fetched */}
                    <div style={{ display: this.state.tabIndex === 2 ? "block" : "none", background: "#f8f9f2a6"}}>
                       <EmployeeTableComponent />
                    </div>
                   
                    {/* Create a review */}
                    <div style={{ display: this.state.tabIndex === 3 ? "block" : "none", background: "#f8f9f2a6"}}>
                       <AssignPerformanceReviewComponent />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    empDetails: state.employeeReducer,
    loginMode: state.loginReducer.loginMode
})

const mapDispatchToProps = {
    fetchAllEmployees
}

const withRouterEmployeeComponent = withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(EmployeeComponent)));
export default withRouterEmployeeComponent;
