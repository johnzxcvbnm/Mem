class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  # Find all the users
  def index
    render json: User.all
  end

  # Find user by ID
  def show
    render json: User.find(params["id"])
  end

  # Find user by Name
  def showName
    render json: User.findByName(params["name"])
  end

  # Create new user
  def create
    render json: User.create(params["user"])
  end

  # Delete user by ID
  def delete
    render json: User.delete(params["id"])
  end

  # Update user by ID
  def update
    render json: User.update(params["id"], params["user"])
  end
end
