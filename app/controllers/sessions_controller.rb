class SessionsController < ApplicationController
  def create
    auth = request.env['omniauth.auth']
    user = User.find_or_create_by!(provider: auth[:provider], uid: auth[:uid]) do |u|
      u.update!(name: auth[:info][:name], image: auth[:info][:image], token: auth[:credentials][:token])
    end
    session[:user_id] = user.id

    redirect_to root_url
  end
end
