Types::GithubEventType = GraphQL::ObjectType.define do
  name "GithubEvent"

  global_id_field :id
  field :type, !types.String do
    resolve ->(obj, args, ctx) {
      obj.github_type
    }
  end
  field :htmlUrl, types.String do
    resolve -> (obj, args, ctx) {
      obj.payload.dig('comment', 'html_url') || obj.payload.dig('issue', 'html_url') || obj.payload.dig('pull_request', 'html_url')
    }
  end
  field :githubUser, !Types::GithubUserType do
    resolve -> (obj, args, ctx) {
      obj.github_user
    }
  end
  field :body, types.String do
    resolve -> (obj, args, ctx) {
      obj.payload.dig('comment', 'body')
    }
  end
  field :createdAt, !types.String do
    resolve -> (obj, args, ctx) {
      obj.github_created_at.iso8601
    }
  end
end
