Types::QueryType = GraphQL::ObjectType.define do
  name "Query"
  # Add root-level fields here.
  # They will be entry points for queries on your schema.

  # TODO: remove me
  field :viewer, Types::UserType do
    description "User"
    resolve ->(obj, args, ctx) {
      ctx[:current_user]
    }
  end

  field :node, GraphQL::Relay::Node.field
end
