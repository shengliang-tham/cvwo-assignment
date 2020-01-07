class PostsController < ApplicationController
  before_action :require_user
  protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token

  def index
    @posts = Post.where(user_id: session[:user_id])
    render :json => @posts
  end

  def create
    @post = Post.new(post_params)
    @post.user_id = session[:user_id]
      if(@post.save)
        @column = Column.where(title: 'To do').take
        @column.post_id += [@post.id]
        @column.save
        render :json => { :success => true}
      else 
        render :json => { :success => false}
      end
  end

  def destroy
    Post.find(params[:id]).delete
    # Column.all.each do |column|
    #   puts "test"
    #   puts column.post_id
    #   @array = column.post_id
    #   @array.inspect
    #   if(column.post_id == params[:id])
    #     puts "equal"
    #   end
    # end
  
    # @column.inspect
    render :json => { :success => true}
  end

  def update
    @post = Post.find(params[:id])
    @post.title = params[:title]
    if(@post.save)
      render :json => { :success => true}
    else 
      render :json => { :success => false}
    end
  end



  def retrieve_column
    @posts = Post.where(user_id: session[:user_id])
    @columns = Column.all
    render :create
  end

  def update_column
    # Rails.logger.debug params.inspect
    params[:columns].each do |key,value|
      # puts column.inspect
      @column = Column.where(id: key)[0]
      puts "test"
      puts @column.inspect
      # puts value[:post_id].inspect
      # puts @column.inspect

      @column.post_id = value[:post_id]
      @column.save
    end
    @posts = Post.where(user_id: session[:user_id])
    @columns = Column.all
    render :create
  end

  def post_params
    params.require(:post).permit(:title,:user_id)
  end 

end