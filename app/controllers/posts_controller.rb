class PostsController < ApplicationController
  before_action :require_user
  protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token

  def index
    @posts = Post.all
    render :json => @posts
  end

  def create
    @post = Post.new(post_params)
    @post.user_id = session[:user_id]
      if(@post.save)
        render :json => { :success => true}
      else 
        render :json => { :success => false}
      end
  end

  def destroy
    Post.find(params[:id]).delete
    render :json => { :success => true}
  end



  def show
    render :json => { :error => "Test"}
  end

  def post_params
    params.require(:post).permit(:title,:user_id)
  end 

end