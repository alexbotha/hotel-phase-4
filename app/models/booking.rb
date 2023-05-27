class Booking < ApplicationRecord
 validates :check_in, :check_out, :guests, :user_id, :hotel_id, presence: true 

  belongs_to :user
  belongs_to :hotel
end
