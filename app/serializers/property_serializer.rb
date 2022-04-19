class PropertySerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :city, :country, :property_type, :price_per_night, :max_guests, :bedrooms, :beds, :baths, :bookings, :images
  has_many :bookings
  has_one :user

end
