module Types::GithubEvent
  include Types::BaseInterface

  global_id_field :id

  field :type, String, method: :github_type, null: false
  field :github_user, Types::GithubUser, null: false
  field :created_at, String, null: false

  orphan_types Types::GithubEvent::PushEvent, Types::GithubEvent::UnknownEvent

  def created_at
    object.github_created_at.iso8601
  end

  definition_methods do
    def resolve_type(object, context)
      case object.github_type
      when 'PushEvent'
        PushEvent
      else
        UnknownEvent
      end
    end
  end
end
