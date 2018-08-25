class Types::Subscription < Types::BaseObject

  field :github_event_created, Types::GithubEvent, null: false, subscription_scope: :current_user_id

  def github_event_created
  end
end
