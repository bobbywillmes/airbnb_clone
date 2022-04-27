class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :bookings, :properties
  has_many :bookings
  has_many :properties

  def bookings
    object.bookings.order('start_date')
  end

end
