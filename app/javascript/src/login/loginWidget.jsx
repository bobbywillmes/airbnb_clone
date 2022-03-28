import React from 'react'
import ReactDOM from 'react-dom'
import { safeCredentials, handleErrors } from '@utils/fetchHelper'
import { apiLogin } from '../../api/user'
import { withAlert } from 'react-alert'

class LoginWidget extends React.Component {
  state = {
    email: '',
    password: '',
    error: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  login = (e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('user[email]', this.state.email)
    formData.append('user[password]', this.state.password)
    apiLogin(formData)
      .then(res => {
        if (res.status === 201) {
          this.props.updateAuthenticated(true)
          const params = new URLSearchParams(window.location.search)
          const redirect_url = params.get('redirect_url') || '/account'
          window.location = redirect_url
        } else {
          this.props.alert.show('incorrect credentials')
        }
      })
      .catch(error => {
        console.log(error)
        this.props.alert.warning('error trying to login')
        this.setState({
          error: 'Could not log in.'
        })
      })
  }

  render() {
    const { email, password, error } = this.state
    return (
      <React.Fragment>
        <form onSubmit={this.login}>
          <input name="email" type="text" className="form-control form-control-lg mb-3" placeholder="Email" value={email} onChange={this.handleChange} required />
          <input name="password" type="password" className="form-control form-control-lg mb-3" placeholder="Password" value={password} onChange={this.handleChange} required />
          <button type="submit" className="btn btn-danger btn-block btn-lg">Log in</button>
          {error && <p className="text-danger mt-2">{error}</p>}
        </form>
        <hr />
        <p className="mb-0">Don't have an account? <a className="text-primary" onClick={this.props.toggle}>Sign up</a></p>
      </React.Fragment>
    )
  }
}

export default withAlert()(LoginWidget)