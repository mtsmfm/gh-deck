class Types::User < Types::BaseObject

  global_id_field :id
  field :login, String, null: false
  field :image, String, null: false
  field :github_events, [Types::GithubEvent], null: false do
    argument :types, [Types::GithubEvent::TypeEnum], required: false
  end

  def github_events(types: [])
    known_all_types = Types::GithubEvent::TypeEnum.values.keys - ['UnknownEvent']
    known_search_types = known_all_types & types

    scope = object.github_events if types.empty?
    scope = object.github_events.where(github_type: known_search_types) unless known_search_types.empty?
    if types&.include?('UnknownEvent')
      unknown_events = object.github_events.where.not(github_type: known_all_types)
      scope = scope ? scope.or(unknown_events) : unknown_events
    end

    scope.order(github_created_at: :desc).limit(20)
  end
end
