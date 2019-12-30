class SessionsController < ApplicationController
  protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token
  wrap_parameters :user, include: [:email, :password]

  def new
  end
  
  def create
    @user = User.find_by_email(params[:email])
    if @user
      if @user.authenticate(params[:password])
        session[:user_id] = @user.id
        render :json => @user
      # puts @user.errors.full_messages
      else 
        render :json => { :error => "Wrong Password"}
      end
    else 
      render :json => { :error => "Invalid Email"}
    end
  end

  def logged_in
    puts "testest"
    @current_user ||= User.find(session[:user_id]) if session[:user_id] # means that this code will return nil if the user has no session and the part after ||= is only executed if @current_user is nil
    # ||= is for "memoization" to not hit the database too many times.
    render :json => !!current_user # !! turns current_user into boolean value
  end

  def destroy
    session[:user_id] = nil
    render :json => { :success => "You have logged out"}
  end
end
