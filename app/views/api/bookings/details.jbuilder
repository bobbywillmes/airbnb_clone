json.details do
  json.id         @id
  json.booking    @booking
  json.nights     @nights
  json.charge     @charge
  json.property   @property
  json.images do
    json.array! @property.images do |image|
      json.id         image.id
      json.src        url_for(image)
    end
  end
end