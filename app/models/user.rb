class User < ApplicationRecord
  has_many :github_events
end
