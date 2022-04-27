import React, { useState } from 'react'
import { initiateStripeCheckout } from '../../api/checkout';
import { formatDate, formatDateTime } from '../utils/dates';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactLoading from 'react-loading';

function startCheckout(bookingId) {
  console.log(`startCheckout(${bookingId}) --`);
  initiateStripeCheckout(bookingId);
}

function PaymentBtn(props) {
  return (
    <button className="btn btn-success paymentBtn" onClick={() => { props.showLoader(); startCheckout(props.booking.id) }} data-bookingid={props.booking.id}>Finish Payment</button>
  )
}

function Charges(props) {
  const paymentBtn = <PaymentBtn booking={props.booking} showLoader={props.showLoader} />;
  const paymentRow = (
    <tr key={props.booking.id} className={props.rowClass}>
      <td></td>
      <td colSpan="6">
        <h4><FontAwesomeIcon color="red" icon={['fas', 'triangle-exclamation']} /> Payment is still required</h4>
        {paymentBtn}
      </td>
    </tr>
  );
  // return payment-required row if no payments
  if (props.charges.length === 0) {
    return paymentRow
  }
  return (
    // loop through charges to find successful charge, then return details
    props.charges.map((charge, index) => {
      // skip to last charge
      if (index < (props.charges.length - 1)) { return false }

      const amount = Number(charge.amount).toFixed(2) + ' ' + charge.currency.toUpperCase();

      // if charge is successful, return details
      if (charge.complete) {
        return (
          <React.Fragment key={charge.id}>
            <tr className={props.rowClass}>
              <td></td>
              <td colSpan="6">
                <h3><FontAwesomeIcon color="orange" icon={['fas', 'face-smile']} /> Payment is complete.</h3>
                <p>Stay tuned for info regarding your reservation.</p>
              </td>
            </tr>
            <tr className={props.rowClass}>
              <td></td>
              <td></td>
              <td colSpan="5">
                <h4>Payment Details</h4>
                <h6>ChargeID: {charge.id}</h6>
                <h6>Amount: {amount}</h6>
                <h6>Date: {formatDateTime(charge.created_at)}</h6>
              </td>
            </tr>
          </React.Fragment>
        )
      }
      // return payment-required row if no successful payment
      return paymentRow
    })
  )
}

function calculateNights(startDate, endDate) {
  let nights = new Date(endDate) - new Date(startDate);
  nights = nights / 1000 / 60 / 60 / 24;
  return nights
}

function totalPrice(nightlyRate, numberOfNights) {
  let total = nightlyRate * numberOfNights;
  total = total.toFixed(2);
  total = '$ ' + total;
  return total
}

const Loader = () => {
  return (
    <div id="loading">
      <ReactLoading type={"bars"} color={"red"} />
    </div>
  )
}

function Bookings(props) {
  console.log(props);
  const [isLoading, setIsLoading] = useState(false);
  const showLoader = () => {
    setIsLoading(true);
  }
  return (
    <React.Fragment>
      {isLoading ? (
        <Loader />
      ) : ''}
      <h2>Bookings</h2>
      <table id="bookings" className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
            <th scope="col">Nights</th>
            <th scope="col">Property</th>
            <th scope="col">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {props.bookings.map((booking, index) => {
            const rowClass = index % 2 == 0 ? 'even' : 'odd';
            return (
              <React.Fragment key={booking.id}>
                <tr scope="row" className={rowClass}>
                  <td>{booking.id}</td>
                  <td>{formatDate(booking.start_date)}</td>
                  <td>{formatDate(booking.end_date)}</td>
                  <td>{calculateNights(booking.start_date, booking.end_date)}</td>
                  <td>
                    <a href={`/property/${booking.property.id}`}>{booking.property.title}</a> <br />
                    <div className="propertyDetails">
                      {booking.property.property_type}
                      <br />
                      ${booking.property.price_per_night} per night
                    </div>
                  </td>
                  <td>
                    {totalPrice(booking.property.price_per_night, calculateNights(booking.start_date, booking.end_date))}
                  </td>
                </tr>
                <Charges charges={booking.charges} booking={booking} showLoader={showLoader} rowClass={rowClass} />
              </React.Fragment>
            )
          })}
        </tbody>
      </table>
    </React.Fragment>
  )
}

export default Bookings