Types::GithubUserType = GraphQL::ObjectType.define do
  name "GithubUser"

  global_id_field :id
  field :login, !types.String
  field :avatarUrl, !types.String do
    resolve -> (obj, args, ctx) {
      obj.avatar_url
    }
  end
end
