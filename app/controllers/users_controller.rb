class UsersController < ApplicationController

  #signuppp
  def create
  end 

  #current user in json 
  def show 
    user = User.find_by(id: session[:user_id])
    if user 
      render json: user 
    else
      render json: {error: "Not authorized"}, status: :unauthorized   
    end 
  end 
end
