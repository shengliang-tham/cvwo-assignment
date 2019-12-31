class PostsController < ApplicationController
  before_action :require_user,

  def index
    @posts = Post.all
    render :json => @posts
  end

  def create
  end



  def show
    render :json => { :error => "Test"}
  end
end