class SessionsController < ApplicationController
  protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token
  wrap_parameters :user, include: [:email, :password]

  def new
  end
  
  def create
    @user = User.find_by_email(params[:email])
    if @user.authenticate(params[:password])
      session[:user_id] = @user.id
      render :json => @user
    else 
      # puts @user.errors.full_messages
      render :json => { :error => "Invalid Credentials"}
    end
  end

  def destroy
    session[:user_id] = nil
    render :json => { :success => "You have logged out"}
  end
end
