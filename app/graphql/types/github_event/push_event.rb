class Types::GithubEvent::PushEvent < Types::BaseObject
  implements Types::GithubEvent

  field :github_repository, Types::GithubRepository, null: false
end
