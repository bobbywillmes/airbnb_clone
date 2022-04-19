import React from 'react';
import Layout from '@src/layout';
import BookingWidget from './bookingWidget';
import { handleErrors } from '@utils/fetchHelper';
import { apiGetProperty, apiGetPropertyBookings } from '../../api/property';
import { apiAuthenticated } from '../../api/user';
import Gallery from '../gallery/gallery';
import Placeholder from '../../../assets/images/placeholder.png';

import './property.scss';

function Images(props) {
  if (props.property.images.length > 0) {
    return <Gallery images={props.property.images} />
  }
  if (props.property.image_url != null) {
    return <div className="property-image mb-3" style={{ backgroundImage: `url(${props.property.image_url})` }} />
  }
  return (
    <div className="m-3">
      <img src={Placeholder} alt="" />
    </div>
  )
}

class Property extends React.Component {
  state = {
    property: {},
    user: {},
    loading: true,
    existingBookings: [],
    authenticated: false
  }

  componentDidMount() {
    // console.log(this.props);
    apiGetProperty(this.props.property_id)
      .then(handleErrors)
      .then(data => {
        console.log(data.property);
        this.setState({
          property: data.property,
          user: data.property.user,
          loading: false,
        })
      })
      .catch(err => console.log(err))
    apiGetPropertyBookings(this.props.property_id)
      .then(res => {
        // console.log(res);
        this.setState({ existingBookings: res.data.bookings })
      })
    apiAuthenticated()
      .then(res => {
        // console.log(res);
        if (res.data.authenticated) { this.setState({ authenticated: true }) }
      })

  }

  render() {
    const { property, loading } = this.state
    if (loading) {
      return <p>loading...</p>
    }

    const {
      id,
      title,
      description,
      city,
      country,
      property_type,
      price_per_night,
      max_guests,
      bedrooms,
      beds,
      baths,
      image_url,
    } = property

    return (
      <Layout>
        <div className="container property">
          <h1 className="mb-0 h4">{title}</h1>
          <span>{city}, {country}</span>
          <Images property={this.state.property} />
          <div className="row">
            <div className="info col-12 col-lg-8">
              <div>
                <p className="mb-0 hosted-by"><span className="text-capitalize">{property_type}</span> hosted by <span className="text-capitalize">{this.state.user.username}</span> </p>
                <p>
                  <span className="ml-2 mr-1">{max_guests} guests </span>
                  &bull;<span className="ml-2 mr-1">{bedrooms} bedroom</span>
                  &bull;<span className="ml-2 mr-1">{beds} bed</span>
                  &bull;<span className="ml-2 mr-1">{baths} bath</span>
                </p>
              </div>
              <hr />
              <p>{description}</p>
            </div>
            <div className="col-12 col-lg-4">
              <BookingWidget property_id={id} price_per_night={price_per_night} authenticated={this.state.authenticated} existingBookings={this.state.existingBookings} />
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Property