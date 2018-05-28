class Types::GithubEvent::UnknownEvent < Types::BaseObject
  implements Types::GithubEvent

  field :body, String, null: true

  def body
    object.payload.dig('comment', 'body')
  end
end
