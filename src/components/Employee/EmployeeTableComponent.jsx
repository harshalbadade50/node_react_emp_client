import React, { Component } from 'react';
import { connect } from 'react-redux';

import UpdateEmployeeModalComponent from './UpdateEmployeeModal.jsx';
import { deleteEmployeeById, updateEmployeeById } from '../../actions/employeeAction.js';
import { addEmployee } from '../../services/employeeService.js';
import '../../App.css';

class EmployeeTableComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            selectedEmployee: {
                "name": "",
                "email": ""
            }
        }
    }

    deleteEmployee = (employee) => {
        this.props.deleteEmployeeById(employee._id);
    }

    showEmpModal = (item) => {
        this.setState({
            showModal: true,
            selectedEmployee: item
        })
    }

    updateEmployee = (employee) => {
        this.props.updateEmployeeById(employee);
        this.hideModal();
    }

    getTableRows = () => {
        let tableRows = [];
        this.props.empDetails.forEach(item => {
            let tableRow = <tr className="emp-table-row" key={item._id}>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.city}</td>
                <td>{item.gender}</td>
                <td>{item.email}</td>
                <td>
                    <button onClick={() => this.deleteEmployee(item)}>Delete</button>
                    <button onClick={() => this.showEmpModal(item)}>Update</button>
                </td>
            </tr>;
            tableRows.push(tableRow);
        });
        if (this.props.empDetails.length <= 0) {
            let emptyRow = <tr className="emp-table-row">
                <td colSpan="6" style={{ textAlign: "center" }}>No Records to Display</td>
            </tr>;
            tableRows.push(emptyRow);
        }
        return tableRows;
    }

    hideModal = () => {
        this.setState({
            showModal: false,
            selectedEmployee: {
                "name": "",
                "email": ""
            }
        })
    }

    render() {
        let empRows = this.getTableRows();
        return (
            <div className="employee-table-section">
                <table>
                    <thead>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>City</th>
                        <th>Gender</th>
                        <th>Email</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        {empRows}
                    </tbody>
                </table>

                <UpdateEmployeeModalComponent show={this.state.showModal}
                    selectedEmployee={this.state.selectedEmployee}
                    hideModal={this.hideModal}
                    updateEmployee={this.updateEmployee}
                    />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    empDetails: state.employeeReducer.allEmployees
})

const mapDispatchToProps = {
    deleteEmployeeById,
    updateEmployeeById
}
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeTableComponent);
