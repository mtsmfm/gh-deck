class Types::GithubEvent::UnknownEvent < Types::BaseObject
  implements Types::GithubEvent

  field :github_repository, Types::GithubRepository, null: true
  field :html_url, String, null: true
  field :body, String, null: true

  def html_url
    object.payload.dig('comment', 'html_url') || object.payload.dig('issue', 'html_url') || object.payload.dig('pull_request', 'html_url')
  end

  def body
    object.payload.dig('comment', 'body')
  end
end
