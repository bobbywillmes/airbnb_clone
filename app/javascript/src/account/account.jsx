import React from 'react'
import Layout from '@src/layout'
import { apiAuthenticated, apiGetUserProperties, apiGetUserInfo } from '../../api/user'
import './account.scss'
import Properties from './properties'
import Bookings from './bookings'

class Account extends React.Component {
  state = {
    userid: undefined,
    username: undefined,
    properties: [],
    bookings: []
  }

  componentDidMount() {
    apiAuthenticated()
      .then(res => {
        this.checkLoginStatus(res)
        this.getUserInfo(this.state.userid)
      })
      .catch(error => {
        console.log(error)
      })
  }

  checkLoginStatus = (res) => {
    if (res.data.authenticated == false) {
      window.location.assign('login')
    } else {
      this.setState({ username: res.data.username })
      this.setState({ userid: res.data.id })
    }
  }

  getUserInfo = (userId) => {
    apiGetUserInfo(userId)
      .then(res => {
        console.log(res.data)
        let properties = res.data.properties
        this.setState({ properties: properties })
        this.setState({ bookings: res.data.bookings })
      })
  }

  render() {
    return (
      <Layout>
        <div id="account">
          <div className="container">
            <div className="row">
              <div className="col">
                <h3>Welcome {this.state.username}</h3>
                <hr />
                <div className="properties">
                  <h3>My properties &amp; Bookings  <small>(click row to see bookings)</small></h3>
                  <Properties properties={this.state.properties} />
                </div>
                <hr />
                <div className="bookings">
                  <h3>My bookings at other places</h3>
                  <Bookings bookings={this.state.bookings} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Account