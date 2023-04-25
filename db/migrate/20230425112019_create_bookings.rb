class CreateBookings < ActiveRecord::Migration[6.1]
  def change
    create_table :bookings do |t|
      t.integer :user_id
      t.integer :hotel_id
      t.date :check_in
      t.date :check_out
      t.integer :guests
      t.integer :overall_price

      t.timestamps
    end
  end
end
