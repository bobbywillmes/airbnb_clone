import React from 'react'
import Layout from '@src/layout'
import { safeCredentials, handleErrors } from '@utils/fetchHelper'
import './booking.scss'

class Booking extends React.Component {
  state = {
    booking: {},
    property: {},
    charge: {},
    nights: null,
    nightsStr: '',
    propertyDetailsStr: '',
    chargeAmountStr: ''
  }

  componentDidMount() {
    this.getBookingDetails()
  }

  getBookingDetails = () => {
    fetch(`/api/booking/${this.props.data.booking_id}/success`)
      .then(handleErrors)
      .then(res => {
        console.log(res.success)
        this.setState({ booking: res.success.booking })
        this.setState({ property: res.success.property })
        this.setState({ charge: res.success.charge })
        this.setState({ nights: res.success.nights })
        this.nights()
        this.propertyDetails()
        this.chargeAmount()
      })
  }

  nights = () => {
    let str = ''
    if (this.state.nights === 1) {
      str = '1 night'
    } else {
      str = `${this.state.nights} nights`
    }
    this.setState({ nightsStr: str })
  }

  propertyDetails = () => {
    let bedrooms = '', beds = '', baths = ''
    if (this.state.property.bedrooms === 1) {
      bedrooms = '1 bedroom'
    } else {
      bedrooms = `${this.state.property.bedrooms} bedrooms`
    }
    if (this.state.property.beds === 1) {
      beds = '1 bed'
    } else {
      beds = `${this.state.property.beds} beds`
    }
    if (this.state.property.baths === 1) {
      baths = '1 bathroom'
    } else {
      baths = `${this.state.property.baths} bathrooms`
    }
    const str = bedrooms + ' (' + beds + ') & ' + baths
    this.setState({ propertyDetailsStr: str })
  }

  chargeAmount = () => {
    let chargeAmountStr = ''
    if(!this.state.charge) {
      console.log(`there is no recorded charge`)
      chargeAmountStr = 'N/A'
    } else {
      chargeAmountStr = this.state.charge.amount + ' ' + this.state.charge.currency
    }
    this.setState({ chargeAmountStr: chargeAmountStr })
  }

  render() {
    return (
      <Layout>
        <div className="container booking">
          <h1>Congrats!</h1>
          <h3>Your reservation has been booked</h3>
          <hr />
          <h4>{this.state.property.title} - {this.state.property.city}, {this.state.property.country}</h4>
          <div className="row align-items-center">
            <div className="col-7 details">
              <div>
                <span className="title">Details:</span> <br />
                <span className="value">{this.state.propertyDetailsStr}</span>
              </div>
              <div>
                <span className="title">Booking ID:</span> <br />
                <span className="value">{this.state.booking.id}</span>
              </div>
              <div>
                <span className="title">Dates:</span> <br />
                <span className="value">{this.state.booking.start_date} - {this.state.booking.end_date} ({this.state.nightsStr})</span>
              </div>
              <div>
                <span className="title">Charge Amount:</span> <br />
                {/* <span className="value">{this.state.charge.amount}  {this.state.charge.currency}</span> */}
                <span className="value">{this.state.chargeAmountStr}</span>
              </div>
            </div>
            <div className="col-5">
              <img src={this.state.property.image_url} alt="" />
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Booking