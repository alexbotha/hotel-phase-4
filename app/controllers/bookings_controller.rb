class BookingsController < ApplicationController
  before_action :auth

  def index 
    
    bookings = current_user.bookings
    render json: bookings
  end 

  def show 
   booking = current_user.bookings.find_by(id: params[:id])
   
   if booking
    render json: booking
   else 
    render json: {error: "Not found"}, status: :unauthorized
  end
end

  def create 
    booking = current_user.bookings.create!(booking_params)
    if booking.save
      render json: booking
    else 
      render json: {errors: booking.errors.full_messages}, status: :unprocessable_entity
  end
end

  def destroy 
    booking = bookings.find(params[:id])
    booking.destroy
    render json: {message: "Booking has been deleted."}, status: :ok
  end 

  def update 
    update = find_booking.update!(booking_params)
    render json: update, status: :ok
  end 

  private 

  def find_booking
    Booking.find(params[:id])
  end 

  def current_user
    User.find_by(id: session[:user_id])
  end 

  def booking_params
    params.permit(:user_id, :check_in, :check_out, :guests, :hotel_id)
  end 

  def auth
    return render json: {error: "Not authorized"}, status: :unauthorized unless session.include? :user_id
  end 

end
