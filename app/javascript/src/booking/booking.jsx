import React from 'react'
import Layout from '@src/layout'
import { safeCredentials, handleErrors } from '@utils/fetchHelper'
import './booking.scss'
import { formatDate } from '../utils/dates'

function NoPaymentNotice(props) {
  if (props.charge == null || props.charge.complete === false) {
    return (
      <>
        <h3 className="text-danger">But, you still need to complete payment for your reservation!</h3>
        <hr />
      </>
    )
  }
  return null
}

function PropertyImage(props) {
  if (props.propertyImage == null) {
    return null
  }
  return (
    <img src={props.propertyImage} alt="" className="img-fluid" />
  )
}

class Booking extends React.Component {
  state = {
    booking: {},
    property: {},
    charge: {},
    nights: null,
    nightsStr: '',
    propertyDetailsStr: '',
    chargeAmountStr: '',
    propertyImage: null
  }

  componentDidMount() {
    this.getBookingDetails()
  }

  getBookingDetails = () => {
    fetch(`/api/booking/${this.props.data.booking_id}/success`)
      .then(handleErrors)
      .then(res => {
        console.log(res);
        this.setState({ booking: res.details.booking })
        this.setState({ property: res.details.property })
        this.setState({ charge: res.details.charge[res.details.charge.length - 1] })
        this.setState({ nights: res.details.nights })
        this.nights()
        this.propertyDetails()
        this.chargeAmount()
        this.setPropertyImage(res)
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
    if (!this.state.charge) {
      console.log(`there is no recorded charge`)
      chargeAmountStr = 'N/A'
    } else {
      chargeAmountStr = Number(this.state.charge.amount).toFixed(2) + ' ' + this.state.charge.currency.toUpperCase()
    }
    this.setState({ chargeAmountStr: chargeAmountStr })
  }

  setPropertyImage = (res) => {
    if (res.details.images.length > 0) {
      this.setState({ propertyImage: res.details.images[0].src })
    } else if (res.details.property.image_url !== null) {
      this.setState({ propertyImage: res.details.property.image_url })
    }
  }

  render() {
    return (
      <Layout>
        <div className="container booking">
          <h3>Your reservation has been booked</h3>
          <hr />
          <NoPaymentNotice charge={this.state.charge} />
          <h4>{this.state.property.title} - {this.state.property.city}, {this.state.property.country}</h4>
          <div className="row align-items-center">
            <div className="col-12 col-md-7 details">
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
                <span className="value">{formatDate(this.state.booking.start_date)} - {formatDate(this.state.booking.end_date)} ({this.state.nightsStr})</span>
              </div>
              <div>
                <span className="title">Charge Amount:</span> <br />
                <span className="value">{this.state.chargeAmountStr}</span>
              </div>
            </div>
            <div className="col-12 col-md-5">
              {/* <img src={this.state.propertyImage} alt="" className="img-fluid" /> */}
              <PropertyImage propertyImage={this.state.propertyImage} />
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Booking