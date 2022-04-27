class BookingSerializer < ActiveModel::Serializer
  attributes :id, :start_date, :end_date, :property, :charges, :test, :paymentComplete
  has_one :property
  has_many :charges

  def test
    return 'testing'
  end

  def paymentComplete
    self.object.charges.map do |charge|
      isPaid = false
      if charge.complete === true
        isPaid = true
        return isPaid
      end
    end
    return false
  end

end
