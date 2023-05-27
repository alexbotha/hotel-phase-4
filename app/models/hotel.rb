class Hotel < ApplicationRecord
  validates :name, :location, uniqueness: true
  
  validates :name, :location, :image_url, :rating, :price, :about, :telephone, :country, presence: true

  validates :rating, :price, :telephone, numericality: true 
  
  
  # No option to delete a hotel but wanted to add this for potential scaling post graduation
  has_many :bookings
  #, dependent: :destroy
  
  has_many :users, through: :bookings
end
