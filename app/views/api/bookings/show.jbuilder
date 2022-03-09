json.booking do
  json.id            @booking.id
  json.start_date    @booking.start_date
  json.end_date      @booking.end_date
  json.user_id       @booking.user_id
  json.property_id   @booking.property_id
  json.created_at    @booking.created_at
  json.updated_at    @booking.updated_at
  json.charge        @charge
  json.property      @property
end