import axios from 'axios'

export function apiLogin(formData) {
  // console.log(`apiLogin() --`)
  return axios({
    method: 'post',
    url: '/api/sessions',
    data: formData
  })
}

export function apiSignup(formData) {
  // console.log(`apiSignup() --`)
  return axios({
    method: 'post',
    url: '/api/users',
    data: formData
  })
}

export function apiAuthenticated() {
  return axios({
    method: 'get',
    url: '/api/authenticated'
  })
}

export function apiGetUserInfo(userId) {
  // console.log(`apiGetUserInfo(${userId}) -- api/user.js`)
  return axios({
    method: 'get',
    url: `/api/user/${userId}`
  })
}
