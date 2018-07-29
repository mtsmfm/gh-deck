class HealthController < ApplicationController
  def show
    render status: :ok
  end
end
