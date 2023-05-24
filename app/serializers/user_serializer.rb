class UserSerializer < ActiveModel::Serializer
  attributes :id, :username

  # has_many :hotels

  has_many :bookings, serializer: UserBookingSerializer
end
