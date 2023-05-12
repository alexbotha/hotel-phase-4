class HotelSerializer < ActiveModel::Serializer
  attributes :id, :name, :location, :image_url, :rating, :price, :about, :telephone, :country

  
  has_many :bookings
end
