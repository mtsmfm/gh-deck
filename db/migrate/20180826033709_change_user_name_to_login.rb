class ChangeUserNameToLogin < ActiveRecord::Migration[5.2]
  def change
    change_table :users, id: :uuid do |t|
      t.rename(:name, :login)
    end
  end
end
