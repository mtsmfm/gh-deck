class Types::SubscriptionType < Types::BaseObject

  field :github_event_created, Types::GithubEventType, null: false, subscription_scope: :current_user_id
end
