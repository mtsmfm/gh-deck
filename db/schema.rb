# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_05_08_143937) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "pgcrypto"
  enable_extension "plpgsql"

  create_table "github_api_responses", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id", null: false
    t.integer "status", null: false
    t.jsonb "data", null: false
    t.jsonb "headers", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_github_api_responses_on_user_id"
  end

  create_table "github_events", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id", null: false
    t.uuid "github_user_id", null: false
    t.uuid "github_organization_id"
    t.uuid "github_repository_id", null: false
    t.string "github_id", null: false
    t.string "github_type", null: false
    t.datetime "github_created_at", null: false
    t.jsonb "payload", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["github_organization_id"], name: "index_github_events_on_github_organization_id"
    t.index ["github_repository_id"], name: "index_github_events_on_github_repository_id"
    t.index ["github_user_id"], name: "index_github_events_on_github_user_id"
    t.index ["user_id", "github_id"], name: "index_github_events_on_user_id_and_github_id", unique: true
    t.index ["user_id"], name: "index_github_events_on_user_id"
  end

  create_table "github_organizations", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "github_id", null: false
    t.string "login", null: false
    t.string "avatar_url", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["github_id"], name: "index_github_organizations_on_github_id", unique: true
  end

  create_table "github_repositories", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "github_id", null: false
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["github_id"], name: "index_github_repositories_on_github_id", unique: true
  end

  create_table "github_users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "github_id", null: false
    t.string "login", null: false
    t.string "avatar_url", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["github_id"], name: "index_github_users_on_github_id", unique: true
  end

  create_table "users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "uid", null: false
    t.string "provider", null: false
    t.string "name", null: false
    t.string "image", null: false
    t.string "token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["provider", "uid"], name: "index_users_on_provider_and_uid", unique: true
  end

  add_foreign_key "github_api_responses", "users"
  add_foreign_key "github_events", "github_organizations"
  add_foreign_key "github_events", "github_repositories"
  add_foreign_key "github_events", "github_users"
  add_foreign_key "github_events", "users"
end
