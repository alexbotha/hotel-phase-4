class HotelsController < ApplicationController

  def index 
    
    hotels = Hotel.all 
    render json: hotels, status: :ok 
  end 

  def create 
    hotel = Hotel.create!(hotel_params)
    render json: hotel, status: :created
  end 

  def destroy 
    
    hotel = Hotel.find(params[:id])
    booking.destroy
    render json: {message: "Booking has been deleted."}, status: :ok
  end 

  private 

  def hotel_params
    params.permit(:name, :location, :image_url, :rating, :price, :about, :telephone, :country)
  end 

end


