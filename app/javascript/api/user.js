import axios from 'axios'

export function apiLogin(formData) {
  console.log(`apiLogin() --`)
  return axios({
    method: 'post',
    url: '/api/sessions',
    data: formData
  })
}

export function apiSignup(formData) {
  console.log(`apiSignup() --`)
  return axios({
    method: 'post',
    url: '/api/users',
    data: formData
  })
}
