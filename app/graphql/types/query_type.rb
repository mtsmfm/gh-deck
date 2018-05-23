class Types::QueryType < Types::BaseObject

  field :viewer, Types::UserType, description: "User", null: true

  def viewer
    context[:current_user]
  end

  field :node, GraphQL::Relay::Node.field, null: true
end
