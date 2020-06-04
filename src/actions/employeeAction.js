import { getAllEmployees, deleteEmployee, updateEmployee } from '../services/employeeService.js';

export function setAllEmployees(employeeList) {
    return function (dispatch) {
        dispatch(setEmployees(employeeList));
    }
}

export function setEmployees(employeeList) {
    return {
        type: "SET_ALL_EMPLOYEES",
        allEmployees: employeeList
    }
}

export function fetchAllEmployees() {
    return function (dispatch) {
        getAllEmployees().then(res => {
            if (res && res.data) {
                dispatch(setEmployees(res.data));
            }
        }).catch(err => {
            console.log('Error in fetching Employee details - ', err);
        });
    }
}

export function deleteEmployeeById(empId) {
    return function (dispatch) {
        deleteEmployee(empId).then(res => {
            if (res && res.status === 200) {
                dispatch(fetchAllEmployees());
            }
        }).catch(err => {
            console.log('Error in fetching Employee details - ', err);
        });
    }
}

export function updateEmployeeById(empObj) {
    return function (dispatch) {
        updateEmployee(empObj).then(res => {
           // if (res && res.status === 200) {
                dispatch(fetchAllEmployees());
            //}
            console.log('update res - ', res);
        }).catch(err => {
            console.log('Error in fetching Employee details - ', err);
        });
    }
}