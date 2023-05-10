class HotelsController < ApplicationController

  def index 
   
    hotels = Hotel.all 
    render json: hotels, status: :ok 
  end 

  def create 
    hotel = Hotel.create!(hotel_params)
    render json: hotel, status: :created
  end 

  def show 
    hotel = Hotel.find_by(id: params[:id])
    if hotel 
      render json: hotel, status: :ok
    else 
      render json: {error: "not found"}, status: :unauthorized
  end 
end

  def destroy 
    
    hotel = Hotel.find(params[:id])
    booking.destroy
    render json: {message: "Booking has been deleted."}, status: :ok
  end 

  def update 
    
    hotel = Hotel.find_by(id: params[:id]) 
      hotel.update!(hotel_params)
      render json: hotel, status: :ok
  end

  private 

  def hotel_params
    params.permit(:name, :location, :image_url, :rating, :price, :about, :telephone, :country)
  end 

end


