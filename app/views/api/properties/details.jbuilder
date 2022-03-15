json.properties do
  json.array! @properties do |property|
    json.id   property.id
    json.title   property.title
    json.bookings @bookings
  end
end