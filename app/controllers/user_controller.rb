class UserController < ApplicationController
  protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token
  def new
    # render json: params
    email = params[:email]

    # puts "test"
    puts email
    render json:params

  end


end
