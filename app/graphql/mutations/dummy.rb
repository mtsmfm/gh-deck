class Mutations::Dummy < GraphQL::Schema::Mutation
  null false

  def resolve
    "Dummy"
  end
end
