class PostsController < ApplicationController
  before_action :require_user,

  def index
  end

  def show
    render :json => { :error => "Test"}
  end
end