import React, { Component } from 'react';
import { connect } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import { deleteEmployeeById, updateEmployeeById } from '../../actions/employeeAction.js';
import { addEmployee } from '../../services/employeeService.js';
import '../../App.css';

class UpdateEmployeeModalComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            city: "",
            gender: "",
            email: "",
            formDirty: false
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (!state.formDirty) {
            return {
                firstName: props.selectedEmployee.firstName,
                lastName: props.selectedEmployee.lastName,
                city: props.selectedEmployee.city,
                gender: props.selectedEmployee.gender,
                email: props.selectedEmployee.email
            }
        }
        return {
            firstName: state.firstName,
            lastName: state.lastName,
            city: state.city,
            gender: state.gender,
            email: state.email
        }
    }

    handleClose = () => {
        this.setState({
            formDirty: false
        }, () => {
            this.props.hideModal(false);
        })
    }

    updateEmployee = () => {
        this.props.selectedEmployee["firstName"] = this.state.firstName;
        this.props.selectedEmployee["lastName"] = this.state.lastName;
        this.props.selectedEmployee["city"] = this.state.city;
        this.props.selectedEmployee["gender"] = this.state.gender;
        this.props.selectedEmployee["email"] = this.state.email;
        this.props.updateEmployee(this.props.selectedEmployee);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            formDirty: true
        })
    }

    render() {
        return (
            <div className="feedback-modal-section">
                <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title"
                    fullWidth={true}
                    open={this.props.show}
                    >
                    <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                        Update Employee Information
                    </DialogTitle>

                    <DialogContent dividers className="employee-update-body">

                        <div className="add-employee-section">
                            <div>
                                <input type="text" placeholder="First Name"
                                    value={this.state.firstName}
                                    name="firstName"
                                    onChange={this.handleChange} />
                            </div>

                            <div>
                                <input type="text" placeholder="Last Name"
                                    value={this.state.lastName}
                                    name="lastName"
                                    onChange={this.handleChange} />
                            </div>

                            <div>
                                <input type="text" placeholder="City"
                                    value={this.state.city}
                                    name="city"
                                    onChange={this.handleChange} />
                            </div>

                            <div>
                                <input type="text" placeholder="Gender"
                                    value={this.state.gender}
                                    name="gender"
                                    onChange={this.handleChange} />
                            </div>

                            <div>
                                <input type="text" placeholder="Email"
                                    value={this.state.email}
                                    name="email"
                                    onChange={this.handleChange} />
                            </div>
                        </div>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={this.updateEmployee} color="primary">
                            Update
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
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
export default connect(mapStateToProps, mapDispatchToProps)(UpdateEmployeeModalComponent);
