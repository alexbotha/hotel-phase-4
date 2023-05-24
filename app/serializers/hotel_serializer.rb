class HotelSerializer < ActiveModel::Serializer
  attributes :id, :name, :location, :image_url, :rating, :price, :about, :telephone, :country, :custom_users

  # Special method that only renders the associated users username of a hotel through a booking on the page once
  def custom_users
    object.users.uniq
  end 
  
  # has_many :bookings
  # has_many :users, through: :bookings
end
