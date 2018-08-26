module Types::GithubEvent
  include Types::BaseInterface

  global_id_field :id

  field :type, Types::GithubEvent::TypeEnum, null: false
  field :github_user, Types::GithubUser, null: false
  field :created_at, String, null: false
  field :github_repository, Types::GithubRepository, null: false

  orphan_types PushEvent, CreateEvent, UnknownEvent

  def type
    self.class.name.demodulize
  end

  def github_user
    ::Loaders::RecordLoader.for(::GithubUser).load(object.github_user_id)
  end

  def github_repository
    ::Loaders::RecordLoader.for(::GithubRepository).load(object.github_repository_id)
  end

  def created_at
    object.github_created_at.iso8601
  end

  definition_methods do
    def resolve_type(object, context)
      case object.github_type
      when 'PushEvent'
        PushEvent
      when 'CreateEvent'
        CreateEvent
      else
        UnknownEvent
      end
    end
  end
end
