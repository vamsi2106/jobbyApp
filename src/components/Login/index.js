import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showStatus: false,
    errorMsg: '',
  }

  handleUsername = event => {
    this.setState({username: event.target.value})
  }

  handlePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = data => {
    const {history} = this.props
    Cookies.set('jwt_token', data.jwt_token, {expires: 1})
    history.replace('/')
  }

  onSubmitFailure = msg => {
    this.setState({showStatus: true, errorMsg: msg})
  }

  handleLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showStatus, errorMsg} = this.state
    const JwtToken = Cookies.get('jwt_token')
    if (JwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <form className="loginForm" onSubmit={this.handleLogin}>
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
            alt="website logo"
          />
          <div>
            <label htmlFor="username">USERNAME</label>
            <br />
            <input
              id="username"
              type="name"
              placeholder="Username"
              value={username}
              onChange={this.handleUsername}
            />
          </div>
          <div>
            <label htmlFor="password">PASSWORD</label>
            <br />
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={this.handlePassword}
            />
          </div>
          <div style={{margin: '0px'}}>
            {showStatus ? (
              <p style={{color: 'red', margin: '0px', fontSize: '15px'}}>
                *{errorMsg}
              </p>
            ) : null}
          </div>
          <div className="login-btn-card">
            <button id="bottone1" type="submit">
              <strong>Login</strong>
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default Login
