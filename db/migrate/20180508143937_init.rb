class Init < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :uid, null: false
      t.string :provider, null: false
      t.string :name, null: false
      t.string :image, null: false
      t.string :token, null: false
      t.index %i(provider uid), unique: true
      t.timestamps
    end
  end
end
