AppSchema = GraphQL::Schema.define do

  mutation(Types::MutationType)
  query(Types::QueryType)
  # Relay Object Identification:

  # Return a string UUID for `object`
  id_from_object ->(object, type_definition, query_ctx) {
    # Here's a simple implementation which:
    # - joins the type name & object.id
    # - encodes it with base64:
    # GraphQL::Schema::UniqueWithinType.encode(type_definition.name, object.id)
  }

  # Given a string UUID, find the object
  object_from_id ->(id, query_ctx) {
    # For example, to decode the UUIDs generated above:
    # type_name, item_id = GraphQL::Schema::UniqueWithinType.decode(id)
    #
    # Then, based on `type_name` and `id`
    # find an object in your application
    # ...
  }

  # Object Resolution
  resolve_type -> (obj, ctx) {
    # TODO: Implement this function
    # to return the correct type for `obj`
    raise(NotImplementedError)
  }

  # GraphQL::Batch setup:
  use GraphQL::Batch
end
