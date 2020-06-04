import axios from 'axios';

export const addEmployee = (employee) => {
    return axios.post("http://localhost:9000/employee/addEmployee", employee);
}

export const getAllEmployees = () => {
     return axios.get('http://localhost:9000/employee');
}

export const deleteEmployee = (empID) => {
    return axios.delete('http://localhost:9000/employee/deleteEmployee/'+ empID);
}

export const updateEmployee = (empObj) => {
    return axios.put('http://localhost:9000/employee/updateEmployee', empObj);
}