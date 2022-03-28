import React from 'react'
import ReactDOM from 'react-dom'
import './editProperty.scss'
import { transitions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import EditProperty from './editProperty'

const alertOptions = {
  position: 'top center',
  timeout: 3000,
  offset: '30px',
  transition: transitions.FADE
}

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('params')
  const data = JSON.parse(node.getAttribute('data-params'))

  ReactDOM.render(
    <AlertProvider template={AlertTemplate} {...alertOptions}>
      <EditProperty data={data} />
    </AlertProvider>,
    document.body.appendChild(document.createElement('div')),
  )
})