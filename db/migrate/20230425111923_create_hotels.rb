class CreateHotels < ActiveRecord::Migration[6.1]
  def change
    create_table :hotels do |t|
      t.string :name
      t.string :location
      t.string :image_url
      t.integer :rating
      t.integer :price
      t.text :about
      t.string :telephone

      t.timestamps
    end
  end
end
