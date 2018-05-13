class GithubEvent < ApplicationRecord
  belongs_to :user
  belongs_to :github_organization, optional: true
  belongs_to :github_user
  belongs_to :github_repository
end
