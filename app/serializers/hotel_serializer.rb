class HotelSerializer < ActiveModel::Serializer
  attributes :id, :name, :location, :image_url, :rating, :price, :about, :telephone, :country, :custom_users

  def custom_users
    object.users.uniq
  end 
  
  has_many :bookings
end
