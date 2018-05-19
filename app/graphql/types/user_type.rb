Types::UserType = GraphQL::ObjectType.define do
  name "User"

  global_id_field :id
  field :name, !types.String
  field :image, !types.String
  field :githubEvents, !types[Types::GithubEventType] do
    resolve -> (obj, args, ctx) {
      obj.github_events.order(github_created_at: :desc).limit(10)
    }
  end
end
