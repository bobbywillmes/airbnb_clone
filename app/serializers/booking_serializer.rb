class BookingSerializer < ActiveModel::Serializer
  attributes :id, :start_date, :end_date, :property
  has_one :property
end
