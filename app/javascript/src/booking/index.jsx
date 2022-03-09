import React from 'react'
import ReactDOM from 'react-dom'
import Booking from './booking'

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('params')
  const data = JSON.parse(node.getAttribute('data-params'))

  ReactDOM.render(
    <Booking data={data} />,
    document.body.appendChild(document.createElement('div')),
  )
})