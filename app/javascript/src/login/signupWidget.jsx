import React from 'react'
import ReactDOM from 'react-dom'
import { safeCredentials, handleErrors } from '@utils/fetchHelper'
import { apiSignup, apiLogin } from '../../api/user'
import { displaySignupErrors } from '../utils/errorHelper'

class SignupWidget extends React.Component {
  state = {
    email: '',
    password: '',
    username: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  signup = (e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('user[username]', this.state.username)
    formData.append('user[email]', this.state.email)
    formData.append('user[password]', this.state.password)
    // signup then login
    apiSignup(formData)
      .then(res => {
        if (res.status === 201) {
          // console.log(`created new user`)
          apiLogin(formData)
            .then(res => {
              if (res.data.success === true) {
                this.props.updateAuthenticated(true)
                const params = new URLSearchParams(window.location.search)
                const redirect_url = params.get('redirect_url') || '/'
                window.location = redirect_url
              }
            })
        } else {
          const error = res.data.error
          displaySignupErrors(error)
        }
      })
      .catch(err => {
        console.log(`axios .catch ---`)
        console.log(err)
      })

  }

  // form inputs are readonly by default to prevent autofill, onFocus enables them
  enableInput = (e) => {
    e.target.removeAttribute('readonly')
  }

  render() {
    const { email, password, username, error } = this.state;
    return (
      <React.Fragment>
        <form id="signup" onSubmit={this.signup} autoComplete="off">

          <div className="mb-2">
            <label htmlFor="signupusername" className="form-label">Username</label>
            <input type="text" name="username" readOnly onFocus={this.enableInput} className="form-control" placeholder="ramblinman" id="signupusername" aria-describedby="signupusernamehelp" onChange={this.handleChange} value={username} />
            <div id="signupusernamehelp" className="form-text">Your public username on Airbnb</div>
          </div>

          <div className="mb-2">
            <label htmlFor="signupemail" className="form-label">Email address</label>
            <input type="email" name="email" readOnly onFocus={this.enableInput} className="form-control" placeholder="ramblinman86@gmail.com" id="signupemail" aria-describedby="signupemailhelp" onChange={this.handleChange} value={email} />
            <div id="signupemailhelp" className="form-text">We'll never share your email with anyone else</div>
          </div>

          <div className="mb-2">
            <label htmlFor="signuppassword" className="form-label">Password</label>
            <input type="password" name="password" readOnly onFocus={this.enableInput} className="form-control" placeholder="••••••••" id="signuppassword" aria-describedby="signuppasswordhelp" onChange={this.handleChange} value={password} />
            <div id="signuppasswordhelp" className="form-text">A strong &amp; unique password</div>
          </div>
          <button type="submit" className="btn btn-danger btn-block btn-lg">Sign up</button>
        </form>
        <hr />
        <p className="mb-0">Already have an account? <a className="text-primary" onClick={this.props.toggle}>Log in</a></p>
      </React.Fragment>
    )
  }
}

export default SignupWidget