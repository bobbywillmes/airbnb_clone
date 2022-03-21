import React from 'react'
import Layout from '@src/layout'
import { apiAuthenticated } from '../../api/user'
import { apiNewProperty } from '../../api/property'

class NewProperty extends React.Component {
  state = {
    title: '',
    description: '',
    city: '',
    country: '',
    property_type: '',
    price_per_night: '',
    max_guests: '',
    bedrooms: '',
    beds: '',
    baths: ''
  }

  componentDidMount() {
    apiAuthenticated()
      .then(res => {
        this.checkLoginStatus(res)
      })
      .catch(error => {
        console.log(error)
      })
  }

  checkLoginStatus = (res) => {
    if (res.data.authenticated == false) {
      window.location.assign('login')
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  enableInput = (e) => {
    e.target.removeAttribute('readonly')
  }

  submitProperty = (e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('property[title]', this.state.title)
    formData.append('property[description]', this.state.description)
    formData.append('property[city]', this.state.city)
    formData.append('property[country]', this.state.country)
    formData.append('property[property_type]', this.state.property_type)
    formData.append('property[price_per_night]', this.state.price_per_night)
    formData.append('property[max_guests]', this.state.max_guests)
    formData.append('property[bedrooms]', this.state.bedrooms)
    formData.append('property[beds]', this.state.beds)
    formData.append('property[baths]', this.state.baths)
    apiNewProperty(formData)
      .then(res => {
        if (res.status === 201) {
          // console.log(`created new property`)
          const params = new URLSearchParams(window.location.search)
          const redirect_url = params.get('redirect_url') || '/account'
          window.location = redirect_url
        } else {
          console.log(res.data.error)
        }
      })
      .catch(err => {
        console.log(`axios .catch on submit for newProperty`)
        console.log(err)
      })
  }

  render() {
    return (
      <Layout>
        <div id="newProperty">
          <div className="container">
            <div className="row">
              <div className="col">
                <h3>Create New Property</h3>
                <h5>Note: All fields are required</h5>
                <form onSubmit={this.submitProperty}>
                  <div className="mb-1">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input readOnly type="text" className="form-control" id="title" aria-describedby="titleHelp" name="title" onFocus={this.enableInput} onChange={this.handleChange} value={this.state.title} placeholder="Cosy Cabin in The Woods" />
                    <div id="titleHelp" className="form-text">The main name of the property</div>
                  </div>
                  <div className="mb-1">
                    <label htmlFor="title" className="form-label">Description</label>
                    <textarea readOnly rows="3" type="text" className="form-control" id="description" aria-describedby="descriptionHelp" name="description" onFocus={this.enableInput} onChange={this.handleChange} value={this.state.description} placeholder="This quaint 3-bedroom cabin has everything you could ask for. It will comfortably sleep up to eight people, is a five minute walk away from the lake & has access to several hiking trails." />
                    <div id="descriptionHelp" className="form-text">A full description of the property &amp; features</div>
                  </div>
                  <div className="mb-1">
                    <label htmlFor="city" className="form-label">City</label>
                    <input readOnly type="text" className="form-control" id="city" name="city" onFocus={this.enableInput} onChange={this.handleChange} value={this.state.city} placeholder="Boulder" />
                  </div>
                  <div className="mb-1">
                    <label htmlFor="country" className="form-label">Country</label>
                    <input readOnly type="text" className="form-control" id="country" name="country" onFocus={this.enableInput} onChange={this.handleChange} value={this.state.country} placeholder="USA" />
                  </div>
                  <div className="mb-1">
                    <label htmlFor="property_type" className="form-label">Property Type</label>
                    <input readOnly type="text" className="form-control" id="property_type" aria-describedby="property_type_help" name="property_type" onFocus={this.enableInput} onChange={this.handleChange} value={this.state.property_type} placeholder="entire cabin" />
                    <div id="property_type_help" className="form-text">Example: entire aparment, private room in house, entire house, studio</div>
                  </div>
                  <div className="mb-1">
                    <label htmlFor="price_per_night" className="form-label">Price per Night</label>
                    <input readOnly type="number" className="form-control" id="price_per_night" aria-describedby="priceHelp" name="price_per_night" onFocus={this.enableInput} onChange={this.handleChange} value={this.state.price_per_night} min="1" step="any" placeholder="30" />
                    <div id="priceHelp" className="form-text">In USD</div>
                  </div>
                  <div className="mb-1">
                    <label htmlFor="max_guests" className="form-label">Max Number of Guests</label>
                    <input readOnly type="number" className="form-control" id="max_guests" aria-describedby="guestsHelp" name="max_guests" onFocus={this.enableInput} onChange={this.handleChange} value={this.state.max_guests} min="1" step="any" placeholder="5" />
                    <div id="guestsHelp" className="form-text">The maximum number of guests that can sleep at this property</div>
                  </div>
                  <div className="mb-1">
                    <label htmlFor="bedrooms" className="form-label">Bedrooms</label>
                    <input readOnly type="number" className="form-control" id="bedrooms" name="bedrooms" onFocus={this.enableInput} onChange={this.handleChange} value={this.state.bedrooms} min="1" step="1" placeholder="3" />
                  </div>
                  <div className="mb-1">
                    <label htmlFor="beds" className="form-label">Beds</label>
                    <input readOnly type="number" className="form-control" id="beds" name="beds" onFocus={this.enableInput} onChange={this.handleChange} value={this.state.beds} min="1" step="1" placeholder="5" />
                  </div>
                  <div className="mb-1">
                    <label htmlFor="baths" className="form-label">Bathrooms</label>
                    <input readOnly type="number" className="form-control" id="baths" name="baths" onFocus={this.enableInput} onChange={this.handleChange} value={this.state.baths} min="1" step="1" placeholder="2" />
                  </div>

                  <button id="submitNew" disabled={!this.state.title || !this.state.description || !this.state.city || !this.state.country || !this.state.property_type || !this.state.price_per_night || !this.state.max_guests || !this.state.bedrooms || !this.state.beds || !this.state.baths} type="submit" className="btn btn-danger">Submit New Property</button>

                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

}

export default NewProperty