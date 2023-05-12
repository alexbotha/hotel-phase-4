class UserBookingSerializer < ActiveModel::Serializer
  attributes :id, :hotel_id, :user_id, :check_in, :check_out, :guests

  attribute :hotel do 
    BookingHotelSerializerSerializer.new(object.hotel)
  end 
end
