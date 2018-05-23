class Types::GithubEvent < Types::BaseObject

  global_id_field :id
  field :type, String, null: false

  def type
    object.github_type
  end
  field :html_url, String, null: true

  def html_url
    object.payload.dig('comment', 'html_url') || object.payload.dig('issue', 'html_url') || object.payload.dig('pull_request', 'html_url')
  end
  field :github_user, Types::GithubUser, null: false

  def github_user
    object.github_user
  end
  field :body, String, null: true

  def body
    object.payload.dig('comment', 'body')
  end
  field :created_at, String, null: false

  def created_at
    object.github_created_at.iso8601
  end
end
