class AddCountryToHotels < ActiveRecord::Migration[6.1]
  def change
    add_column :hotels, :country, :string
  end
end
