class BookingsController < ApplicationController
  # before_action taking in the private method :auth - this runs before anyting else which prevents someone from gaining access to the crud actions unless they're a verified user
  before_action :auth

  def index
    bookings = Booking.all
    render json: bookings, status: :ok
    #, include: [:hotel, :user]
  end 

  def show 
   booking = current_user.bookings.find_by(id: params[:id])
    render json: booking, status: :ok
    # , include: [:hotel, :user]
end

  def create 
    booking = current_user.bookings.create(booking_params)
    if booking.valid?
      render json: booking, status: :ok
    else 
      render json: {errors: booking.errors.full_messages}, status: :unprocessable_entity
    end
end

  def destroy  
    booking = find_booking
    if booking.user_id == session[:user_id]
    booking.destroy
    render json: {message: "Booking has been deleted."}, status: :ok
    else 
      render json: {error: "You do not have permission to delete this booking"}, status: :unauthorized
      end
  end 

  def update 
    booking = current_user.bookings.find(params[:id])
    booking.update!(booking_params)
    if booking
    render json: booking, status: :ok
    else 
      render json: {error: ["Please make sure fields are completed"]}, status: :unprocessable_entity
    end 
  end 

  private 

  def find_booking
    Booking.find(params[:id])
  end 

  def current_user
    User.find_by(id: session[:user_id])
  end 

  def booking_params
    params.permit(:user_id, :check_in, :check_out, :guests, :hotel_id, :id)
  end 

  def auth
    return render json: {error: "Not authorized. Please login or sign up."}, status: :unauthorized unless session.include? :user_id
  end 

end
