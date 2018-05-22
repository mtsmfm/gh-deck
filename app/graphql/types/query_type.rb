Types::QueryType = GraphQL::ObjectType.define do
  name "Query"

  field :viewer, Types::UserType do
    description "User"
    resolve ->(obj, args, ctx) {
      ctx[:current_user]
    }
  end

  field :node, GraphQL::Relay::Node.field
end
