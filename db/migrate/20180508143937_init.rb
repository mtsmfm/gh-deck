class Init < ActiveRecord::Migration[5.2]
  def change
    enable_extension 'pgcrypto'

    create_table :users, id: :uuid do |t|
      t.string :uid, null: false
      t.string :provider, null: false
      t.string :name, null: false
      t.string :image, null: false
      t.string :token, null: false
      t.index %i(provider uid), unique: true
      t.timestamps
    end

    create_table :github_api_responses, id: :uuid do |t|
      t.belongs_to :user, null: false, foreign_key: true, index: true, type: :uuid
      t.integer :status, null: false
      t.jsonb :data, null: false
      t.jsonb :headers, null: false
      t.timestamps
    end

    create_table :github_repositories, id: :uuid do |t|
      t.string :github_id, null: false, index: {unique: true}
      t.string :name, null: false
      t.timestamps
    end

    create_table :github_organizations, id: :uuid do |t|
      t.string :github_id, null: false, index: {unique: true}
      t.string :login, null: false
      t.string :avatar_url, null: false
      t.timestamps
    end

    create_table :github_users, id: :uuid do |t|
      t.string :github_id, null: false, index: {unique: true}
      t.string :login, null: false
      t.string :avatar_url, null: false
      t.timestamps
    end

    create_table :github_events, id: :uuid do |t|
      t.belongs_to :user,                null: false, foreign_key: true, index: true, type: :uuid
      t.belongs_to :github_user,         null: false, foreign_key: true, index: true, type: :uuid
      t.belongs_to :github_organization, null: true,  foreign_key: true, index: true, type: :uuid
      t.belongs_to :github_repository,   null: false, foreign_key: true, index: true, type: :uuid

      t.string :github_id, null: false
      t.string :github_type, null: false
      t.datetime :github_created_at, null: false
      t.jsonb :payload, null: false
      t.timestamps

      t.index %i(user_id github_id), unique: true
    end
  end
end
