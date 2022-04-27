import React from 'react'
import 'react-dates/initialize'
import { DateRangePicker } from 'react-dates'
import { safeCredentials, handleErrors } from '@utils/fetchHelper'

import 'react-dates/lib/css/_datepicker.css'
import { initiateStripeCheckout } from '../../api/checkout'

class BookingWidget extends React.Component {
  state = {
    startDate: null,
    endDate: null,
    focusedInput: null,
    loading: false,
    error: false,
  }


  submitBooking = (e) => {
    if (e) { e.preventDefault(); }
    const { startDate, endDate } = this.state
    console.log(startDate, endDate)
    console.log(startDate.format('MMM DD YYYY'), endDate.format('MMM DD YYYY'))

    fetch(`/api/bookings`, safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        booking: {
          property_id: this.props.property_id,
          start_date: startDate.format('MMM DD YYYY'),
          end_date: endDate.format('MMM DD YYYY'),
        }
      })
    }))
      .then(handleErrors)
      .then(response => {
        console.log(response)
        return initiateStripeCheckout(response.booking.id)
      })
      .catch(error => {
        console.log(error)
      })
  }

  onDatesChange = ({ startDate, endDate }) => this.setState({ startDate, endDate })

  onFocusChange = (focusedInput) => this.setState({ focusedInput })

  isDayBlocked = day => this.props.existingBookings.filter(b => day.isBetween(b.start_date, b.end_date, null, '[)')).length > 0

  render() {
    const { startDate, endDate, focusedInput } = this.state
    if (!this.props.authenticated) {
      return (
        <div className="border p-4 mb-4">
          Please <a href={`/login?redirect_url=${window.location.pathname}`}>log in</a> to make a booking.
        </div>
      )
    }

    const { price_per_night } = this.props

    let nights
    if (startDate && endDate) {
      nights = endDate.diff(startDate, 'days')
    }

    return (
      <div className="border p-4 mb-4">
        <form onSubmit={this.submitBooking}>
          <h5>${price_per_night} <small>per night</small></h5>
          <hr />
          <div style={{ marginBottom: focusedInput ? '400px' : '2rem' }}>
            <DateRangePicker
              startDate={startDate} // momentPropTypes.momentObj or null,
              startDateId="start_date" // PropTypes.string.isRequired,
              endDate={endDate} // momentPropTypes.momentObj or null,
              endDateId="end_date" // PropTypes.string.isRequired,
              onDatesChange={this.onDatesChange}
              focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
              onFocusChange={this.onFocusChange} // PropTypes.func.isRequired,
              isDayBlocked={this.isDayBlocked} // block already booked dates
              numberOfMonths={1}
            />
          </div>
          {nights && (
            <React.Fragment>
              <div className="d-flex justify-content-between">
                <p>Nights</p>
                <p>{nights}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Total</p>
                <p>${(price_per_night * nights).toLocaleString()}</p>
              </div>
            </React.Fragment>
          )}
          <button type="submit" className="btn btn-large btn-danger btn-block">Book</button>
        </form>
      </div>
    )
  }
}

export default BookingWidget