namespace :graphql do
  task "schema:dump" => :environment do
    File.write(Rails.root.join("schema.graphql"), AppSchema.to_definition)
    File.write(Rails.root.join("schema.json"), AppSchema.to_json)
  end
end
