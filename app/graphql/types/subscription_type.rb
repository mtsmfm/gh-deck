Types::SubscriptionType = GraphQL::ObjectType.define do
  name "Subscription"

  field :githubEventCreated, !Types::GithubEventType do
    subscription_scope :current_user_id
  end
end
