class User < ApplicationRecord
  has_secure_password
  validates :username, :email, :password, :password_confirmation, presence: :true 

  validates :email, uniqueness: true
  validates :username, uniqueness: true
  validates :password, length: {minimum: 5}


  has_many :bookings 
  has_many :hotels, through: :bookings 
end
