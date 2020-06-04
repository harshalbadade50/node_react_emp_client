import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addEmployee } from '../../services/employeeService.js';
import { fetchAllEmployees } from '../../actions/employeeAction.js';
import '../../App.css';

class AddEmployeeComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            city: "",
            gender: "",
            email: ""
        }
    }

    // collect employee data
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    // add employee details to employee table
    addEmployee = () => {
        addEmployee(this.state).then(res => {
            if(res && res.status === 200){
                this.props.fetchAllEmployees();
            }
        }).catch(err => {
            console.log("Error in Adding Employee - ", err);
        });
    }

    render() {
        return (
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

                <div>
                    <button className="add-emp-btn" onClick={this.addEmployee}>Add</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = {
    fetchAllEmployees
}
export default connect(mapStateToProps, mapDispatchToProps)(AddEmployeeComponent);
