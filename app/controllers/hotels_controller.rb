class HotelsController < ApplicationController
  before_action :auth

  def index 
    hotels = Hotel.all 
    render json: hotels, status: :ok
    #, include: ['bookings', 'bookings.user']
  end 

  def create 
    hotel = Hotel.create(hotel_params)
    if hotel.valid?
    render json: hotel, status: :ok
    else 
      render json: {errors: hotel.errors.full_messages}, status: :unprocessable_entity
    end
  end 

  def show 
    hotel = Hotel.find_by(id: params[:id]) 
      render json: hotel, status: :ok
      #, include: ['bookings', 'bookings.user'] 
end

  # def destroy 
  #   hotel = Hotel.find(params[:id])
  #   booking.destroy
  #   render json: {message: "Booking has been deleted."}, status: :ok
  # end 

  # def update 
  #   hotel = Hotel.find_by(id: params[:id]) 
  #     hotel.update!(hotel_params)
  #     render json: hotel, status: :ok
  # end

  private 

  def hotel_params
     params.permit(:name, :location, :image_url, :rating, :price, :about, :telephone, :country)
 end 

  def auth
    return render json: {error: "Not authorized. Please log in or sign up"}, status: :unauthorized unless session.include? :user_id
  end 

end


