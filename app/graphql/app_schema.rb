class AppSchema < GraphQL::Schema

  mutation(Types::MutationType)
  query(Types::QueryType)
  subscription Types::SubscriptionType
  # Relay Object Identification:

  class << self
    # Return a string UUID for `object`
    def id_from_object(object, type_definition, query_ctx)
      GraphQL::Schema::UniqueWithinType.encode(type_definition.name, object.id)
    end

    # Given a string UUID, find the object
    def object_from_id(id, query_ctx)
      type_name, item_id = GraphQL::Schema::UniqueWithinType.decode(id)
      case type_name
      when 'User'
        User.find(item_id)
      end
    end

    # Object Resolution
    def resolve_type(type, obj, ctx)
      # TODO: Implement this function
      # to return the correct type for `obj`
      raise(NotImplementedError)
    end
  end

  # GraphQL::Batch setup:
  use GraphQL::Batch
  use GraphQL::Subscriptions::ActionCableSubscriptions
end
