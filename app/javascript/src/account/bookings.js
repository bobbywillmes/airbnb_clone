import React from 'react'

function Bookings(props) {
  return (
    <React.Fragment>
      <h2>Bookings</h2>
      <table id="bookings" className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
            <th scope="col">Property ID</th>
            <th scope="col">Property</th>
          </tr>
        </thead>
        <tbody>
          {props.bookings.map(booking => {
            return (
              <tr key={booking.id} scope="row">
                <td>{booking.id}</td>
                <td>{booking.start_date}</td>
                <td>{booking.end_date}</td>
                <td>{booking.property.id}</td>
                <td>
                  <a href={`/property/${booking.property.id}`}>{booking.property.title}</a> <br />
                  {booking.property.property_type}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </React.Fragment>
  )
}

export default Bookings