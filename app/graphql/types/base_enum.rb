class Types::BaseEnum < GraphQL::Schema::Enum
  class << self
    def graphql_name(arg = nil)
      raise ArgumentError if arg

      name.split('::')[1..-1].join('_')
    end
  end
end
