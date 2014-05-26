class SessionsController < ApplicationController
  before_action :require_login, only: :destroy

  def new
    @user = User.new
  end

  def create
    @user = User.find_by_credentials(user_params)

    if @user
      login_user!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = ["Invalid username or password"]
      redirect_to new_session_url
    end
  end

  def destroy
    logout!
    redirect_to root_url
  end

  def guest_sign_in
    @user = User.find_by_username("guest")
    login_user!(@user)
    redirect_to root_url
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
