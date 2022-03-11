import React from 'react'
import ReactDOM from 'react-dom'
import { transitions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import Login from './login'

const options = {
  position: 'top center',
  timeout: 3000,
  offset: '30px',
  transition: transitions.FADE
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <AlertProvider template={AlertTemplate} {...options}>
      <Login />
    </AlertProvider>,
    document.body.appendChild(document.createElement('div')),
  )
})