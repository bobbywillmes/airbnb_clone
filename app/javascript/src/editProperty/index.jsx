import React from 'react'
import ReactDOM from 'react-dom'
import './editProperty.scss'
import EditProperty from './editProperty'

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('params')
  const data = JSON.parse(node.getAttribute('data-params'))

  ReactDOM.render(
    <EditProperty data={data} />,
    document.body.appendChild(document.createElement('div')),
  )
})