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

class FeedbackModalComponent extends Component {

    constructor(props) {
        super(props);
        this.feedbackRef = React.createRef();
    }

    handleClose = () => {
        this.props.hideFeedbackModal(false);
    }

// send feedback data to parent component
    updateFeedback = () => {
        this.props.selectedReview["feedback"] = this.feedbackRef.current.value;
        this.props.selectedReview["requireFeedback"] = false;
        this.props.updateFeedback(this.props.selectedReview);
    }

    render() {
        return (
            <div className="feedback-modal-section">
                <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" 
                    fullWidth={true}
                    open={this.props.show}
                >
                    <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                        Feedback
                    </DialogTitle>

                    <DialogContent dividers>
                        <textarea rows="10" autoFocus ref={this.feedbackRef} style={{width: '98%'}}></textarea>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={this.updateFeedback} color="primary">
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
export default connect(mapStateToProps, mapDispatchToProps)(FeedbackModalComponent);
