import React from 'react'
import Layout from '@src/layout'
import { apiAuthenticated } from '../../api/user'
import { apiEditProperty } from '../../api/property'
import { handleErrors } from '@utils/fetchHelper'

class EditProperty extends React.Component {
  state = { }



  componentDidMount() {
    fetch(`/api/properties/${this.props.data.property_id}`)
      .then(handleErrors)
      .then(data => {
        this.setPropertyAttributes(data.property)
        this.setState({
          user: data.property.user,
          loading: false,
        })
      })
  }

  setPropertyAttributes = (property) => {
    for(let attribute in property) {
      this.setState({[attribute]: property[attribute]})
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(`handleSubmit`)
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
    apiEditProperty(this.state.id, formData)
      .then(res => {
        if(res.status === 200) {
          const params = new URLSearchParams(window.location.search)
          const redirect_url = params.get('redirect_url') || '/account'
          window.location = redirect_url
        }
      })
      .catch(err => {
        console.log(`apiEditProperty .catch`)
        console.log(err)
      })
  }

  render() {
    return (
      <Layout>
      <div id="editProperty">
          <div className="container">
            <div className="row">
              <div className="col">
                <h3>Edit Property</h3>
                <form onSubmit={this.handleSubmit}>
                  <div className="mb-1">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" aria-describedby="titleHelp" name="title" onChange={this.handleChange} value={this.state.title || ''} placeholder="Cosy Cabin in The Woods" />
                    <div id="titleHelp" className="form-text">The main name of the property</div>
                  </div>
                  <div className="mb-1">
                    <label htmlFor="title" className="form-label">Description</label>
                    <textarea rows="3" type="text" className="form-control" id="description" aria-describedby="descriptionHelp" name="description" onChange={this.handleChange} value={this.state.description || ''} placeholder="This quaint 3-bedroom cabin has everything you could ask for. It will comfortably sleep up to eight people, is a five minute walk away from the lake & has access to several hiking trails." />
                    <div id="descriptionHelp" className="form-text">A full description of the property &amp; features</div>
                  </div>
                  <div className="mb-1">
                    <label htmlFor="city" className="form-label">City</label>
                    <input type="text" className="form-control" id="city" name="city" onChange={this.handleChange} value={this.state.city || ''} placeholder="Boulder" />
                  </div>
                  <div className="mb-1">
                    <label htmlFor="country" className="form-label">Country</label>
                    <input type="text" className="form-control" id="country" name="country" onChange={this.handleChange} value={this.state.country || ''} placeholder="USA" />
                  </div>
                  <div className="mb-1">
                    <label htmlFor="property_type" className="form-label">Property Type</label>
                    <input type="text" className="form-control" id="property_type" aria-describedby="property_type_help" name="property_type" onChange={this.handleChange} value={this.state.property_type || ''} placeholder="entire cabin" />
                    <div id="property_type_help" className="form-text">Example: entire aparment, private room in house, entire house, studio</div>
                  </div>
                  <div className="mb-1">
                    <label htmlFor="price_per_night" className="form-label">Price per Night</label>
                    <input type="number" className="form-control" id="price_per_night" aria-describedby="priceHelp" name="price_per_night" onChange={this.handleChange} value={this.state.price_per_night || ''} min="1" step="any" placeholder="30" />
                    <div id="priceHelp" className="form-text">In USD</div>
                  </div>
                  <div className="mb-1">
                    <label htmlFor="max_guests" className="form-label">Max Number of Guests</label>
                    <input type="number" className="form-control" id="max_guests" aria-describedby="guestsHelp" name="max_guests" onChange={this.handleChange} value={this.state.max_guests || ''} min="1" step="any" placeholder="5" />
                    <div id="guestsHelp" className="form-text">The maximum number of guests that can sleep at this property</div>
                  </div>
                  <div className="mb-1">
                    <label htmlFor="bedrooms" className="form-label">Bedrooms</label>
                    <input type="number" className="form-control" id="bedrooms" name="bedrooms" onChange={this.handleChange} value={this.state.bedrooms || ''} min="1" step="1" placeholder="3" />
                  </div>
                  <div className="mb-1">
                    <label htmlFor="beds" className="form-label">Beds</label>
                    <input type="number" className="form-control" id="beds" name="beds" onChange={this.handleChange} value={this.state.beds || ''} min="1" step="1" placeholder="5" />
                  </div>
                  <div className="mb-1">
                    <label htmlFor="baths" className="form-label">Bathrooms</label>
                    <input type="number" className="form-control" id="baths" name="baths" onChange={this.handleChange} value={this.state.baths || ''} min="1" step="1" placeholder="2" />
                  </div>

                  <button id="submitUpdate" type="submit" className="btn btn-danger">Update Property</button>

                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default EditProperty