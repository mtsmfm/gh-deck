class Types::User < Types::BaseObject

  global_id_field :id
  field :name, String, null: false
  field :image, String, null: false
  field :github_events, [Types::GithubEvent, null: true], null: false

  def github_events
    object.github_events.order(github_created_at: :desc).where(github_type: 'CreateEvent').limit(10)
  end
end
