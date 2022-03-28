import axios from 'axios'

export function apiNewProperty(formData) {
  return axios({
    method: 'post',
    url: '/api/properties',
    data: formData
  })
}

export function apiEditProperty(property_id, formData) {
  return axios({
    method: 'patch',
    url: `/api/properties/${property_id}`,
    data: formData
  })
}

export function apiDeleteImage(imageId) {
  return axios({
    method: 'delete',
    url: `/api/properties/image/${imageId}`
  })
}