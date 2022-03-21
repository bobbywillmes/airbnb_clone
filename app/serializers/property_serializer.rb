class PropertySerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :city, :country, :property_type, :price_per_night, :max_guests, :bedrooms, :beds, :baths, :bookings
  has_many :bookings
  has_one :user

  def image_url
    if object.image.attached?
      {
        url: rails_blob_url(object.image)
      }
    end
  end

end
