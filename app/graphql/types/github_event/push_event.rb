class Types::GithubEvent::PushEvent < Types::BaseObject
  implements Types::GithubEvent

  class Types::GithubEvent::PushEvent::Author < Types::BaseObject
    field :name, String, null: false
    field :email, String, null: false
  end

  class Types::GithubEvent::PushEvent::Commit < Types::BaseObject
    field :sha, String, null: false
    field :message, String, null: false
    field :author, Author, null: false
    field :url, String, null: false
    field :distinct, Boolean, null: false
  end

  class Types::GithubEvent::PushEvent::Payload < Types::BaseObject
    field :ref, String, null: false
    field :head, String, null: false
    field :before, String, null: false
    field :size, Integer, null: false
    field :commits, [Commit], null: false
  end

  field :github_repository, Types::GithubRepository, null: false
  field :payload, Payload, null: false
end
