// Package dependencies
import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import { UserLogin } from '../../graphql/queries/User';
import { withRouter } from 'react-router-dom';

class Login extends Component {
    state = {
        username: '',
        password: ''
    };

    logUser = () => {
        this.props.client.query({
            query: UserLogin,
            variables: {
                username: this.state.username,
                password: this.state.password
            }
        }).then(response => {
            if (response.data.login) {
                localStorage.setItem('userid', response.data.login.id);
                localStorage.setItem('username', response.data.login.username);
                window.location.reload();                
            } else {

            }
        })
    }

    render = () => {
        return (
            <div>
                <div class="form-group">
                    <label for="txtUser">User</label>
                    <input class="form-control" id="txtUser" value={this.state.username} onChange={e => this.setState({ username: e.target.value })} />
                </div>
                <div class="form-group">
                    <label for="txtPassword">Password</label>
                    <input type="password" class="form-control" id="txtPassword" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} />
                </div>
                <button onClick={this.logUser} class="btn btn-primary">Log</button>
            </div>
        )
    }
}

export default withApollo(withRouter(Login));