class Types::BaseObject < GraphQL::Schema::Object
  class << self
    def graphql_name(arg = nil)
      raise ArgumentError if arg

      name.split('::')[1..-1].join('_')
    end
  end
end
