class Types::GithubEvent::CreateEvent < Types::BaseObject
  implements Types::GithubEvent

  class Types::GithubEvent::CreateEvent::Payload < Types::BaseObject
    field :ref_type, String, null: false
    field :ref, String, null: true
    field :master_branch, String, null: false
    field :description, String, null: true
  end

  field :github_repository, Types::GithubRepository, null: false
  field :payload, Payload, null: false
end
