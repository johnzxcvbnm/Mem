class LikesController < ApplicationController
  skip_before_action :verify_authenticity_token

  # Find all likes
  def index
    render json: Like.all
  end

  # Find like by ID
  def show
    render json: Like.find(params["id"])
  end

  # Create new like
  def create
    render json: Like.create(params["like"])
  end

  # Delete like by ID
  def delete
    render json: Like.delete(params["id"])
  end

  # Update like by ID
  def update
    render json: Like.update(params["id"], params["like"])
  end
end
