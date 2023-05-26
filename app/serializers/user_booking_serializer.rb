class UserBookingSerializer < ActiveModel::Serializer
  attributes :id, :hotel_id, :user_id, :check_in, :check_out, :guests

  #Grab the hotel attribute and make a new hotel object to render only specific attributes in the myaccount route
  attribute :hotel do 
    BookingHotelSerializerSerializer.new(object.hotel)
  end 
end
