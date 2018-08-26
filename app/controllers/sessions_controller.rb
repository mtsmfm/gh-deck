class SessionsController < ApplicationController
  def create
    auth = request.env['omniauth.auth']
    user = User.find_or_initialize_by(provider: auth[:provider], uid: auth[:uid]).tap do |u|
      u.update!(login: auth[:extra][:raw_info][:login], image: auth[:info][:image], token: auth[:credentials][:token])
    end
    session[:user_id] = user.id

    redirect_to root_url
  end
end
