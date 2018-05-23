class Types::GithubUser < Types::BaseObject

  global_id_field :id
  field :login, String, null: false
  field :avatar_url, String, null: false

  def avatar_url
    object.avatar_url
  end
end
