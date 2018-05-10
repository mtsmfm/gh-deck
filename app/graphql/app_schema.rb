AppSchema = GraphQL::Schema.define do

  mutation(Types::MutationType)
  query(Types::QueryType)
  # Relay Object Identification:

  # Return a string UUID for `object`
  id_from_object ->(object, type_definition, query_ctx) {
    GraphQL::Schema::UniqueWithinType.encode(type_definition.name, object.id)
  }

  # Given a string UUID, find the object
  object_from_id ->(id, query_ctx) {
    type_name, item_id = GraphQL::Schema::UniqueWithinType.decode(id)
    case type_name
    when 'User'
      User.find(item_id)
    end
  }

  # Object Resolution
  resolve_type -> (type, obj, ctx) {
    # TODO: Implement this function
    # to return the correct type for `obj`
    raise(NotImplementedError)
  }

  # GraphQL::Batch setup:
  use GraphQL::Batch
end
