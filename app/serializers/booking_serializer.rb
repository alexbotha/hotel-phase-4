class BookingSerializer < ActiveModel::Serializer
  attributes :id, :check_in, :check_out, :guests
  belongs_to :hotel 
  belongs_to :user
end
