class GithubApiResponse < ApplicationRecord
  belongs_to :user

  class << self
    def record_last_response!(user:, last_response:)
      create!(user: user, headers: last_response.headers, status: last_response.status, data: last_response.data)
    end
  end
end
