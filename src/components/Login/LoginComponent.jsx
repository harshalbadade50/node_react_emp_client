import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { useHistory } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import history from '../history.js';

import { login } from '../../actions/loginAction.js';
import '../../App.css';

class LoginComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    componentDidMount = () => {
        history.push("/");
    }

    componentDidUpdate = (prevProps) => {
        if(prevProps.loginMode !== this.props.loginMode && this.props.loginMode){
           // const history = useHistory();
            this.props.history.push("/"+this.props.loginMode);
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    doLogin = () => {
       this.props.login(this.state);
    }

    render() {
        return (
            <div className="login-section" style={{background: "#3d3665"}}>
                <div className="login-container">
                    <div>
                        <div style={{fontWeight: 600}}>LOGIN</div>
                        <input type="text" placeholder="Email"
                            value={this.state.email}
                            name="email"
                            onChange={this.handleChange} />
                    </div>
                    <div>
                        <input type="text" placeholder="Password"
                            type="password"
                            value={this.state.password}
                            name="password"
                            onChange={this.handleChange} />
                    </div>
                    <div>
                        <div onClick={this.doLogin} className="login-btn">Login</div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loginMode: state.loginReducer.loginMode
})

const mapDispatchToProps = {
    login
}

const withRouterLoginComponent = withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginComponent));
export default withRouterLoginComponent;
