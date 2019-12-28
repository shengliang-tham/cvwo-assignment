class UsersController < ApplicationController
  protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token
  wrap_parameters :user, include: [:email, :password]
  
  def create
    @user = User.new(user_params)
    puts @user
    if @user.save
      render :json => @user
    else 
      # puts @user.errors.full_messages
      render :json => { :error => @user.errors.full_messages}
    end

  end

  def login
    @user = User.find_by(params[:email])
    if @user.authenticate(params[:password])
      render :json => @user
    else 
      # puts @user.errors.full_messages
      render :json => { :error => "Invalid Credentials"}
    end
  end


  private def user_params
    params.require(:user).permit(:email,:password)
  end

end
