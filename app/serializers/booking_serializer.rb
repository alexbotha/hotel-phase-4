class BookingSerializer < ActiveModel::Serializer
  attributes :id, :check_in, :check_out, :guests, :hotel_id, :user_id
  belongs_to :hotel 
  belongs_to :user
end
