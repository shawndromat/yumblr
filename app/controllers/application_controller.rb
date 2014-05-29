class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user

  def require_login
    flash.notice = ["You must be logged in to do that"]
    redirect_to new_session_url if current_user.nil?
  end

  def require_correct_user
    unless current_user.id == params[:id].to_i
      redirect_to (current_user.nil? ? new_sesson_url : current_user)
    end
  end

  def current_user
    return nil if session[:token].nil?
    @current_user ||= User.find_by_session_token(session[:token])
  end

  def login_user!(user)
    @current_user = user
    session[:token] = @current_user.reset_session_token!
  end

  def logout!
    current_user.reset_session_token!
    session[:token] = nil
  end

end
