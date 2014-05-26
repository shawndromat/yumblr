class UsersController < ApplicationController
  before_action :require_correct_user, only: [:show, :destroy]

  def create
    @user = User.new(user_params)

    if @user.save
      login_user!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end

end
