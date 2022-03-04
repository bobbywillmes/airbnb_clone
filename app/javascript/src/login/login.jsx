import React from 'react'
import Layout from '@src/layout'
import LoginWidget from './loginWidget'
import SignupWidget from './signupWidget'
import { safeCredentials, handleErrors } from '@utils/fetchHelper'

import './login.scss'

class Login extends React.Component {
  state = {
    authenticated: false,
    show_login: true,
  }

  componentDidMount() {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        this.setState({
          authenticated: data.authenticated,
        })
      })
  }

  toggle = () => {
    this.setState({
      show_login: !this.state.show_login,
    })
  }

  logout = (e) => {
    e.preventDefault()
    fetch('/api/sessions', safeCredentials({
      method: 'DELETE',
    }))
      .then(handleErrors)
      .then(data => {
        if (data.success) {
          this.setState({ authenticated: false, show_login: true })
          const params = new URLSearchParams(window.location.search)
          const redirect_url = params.get('redirect_url') || '/'
          window.location = redirect_url
        }
      })
      .catch(error => {
        console.log(error)
        this.setState({
          error: 'Could not log in.',
        })
      })
  }

  render() {
    const { authenticated, show_login } = this.state
    if (authenticated) {
      return (
        <Layout>
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-9 col-lg-6 mx-auto my-4">
                <div className="border p-4">
                  <p className="mb-0">You are already logged in 🙂</p>
                  <br />
                  <button className="btn btn-secondary" onClick={this.logout}>Log Out</button>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      )
    }

    return (
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-9 col-lg-6 mx-auto my-4">
              <div className="border p-4">
                {show_login ? <LoginWidget toggle={this.toggle} /> : <SignupWidget toggle={this.toggle} />}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Login