class ChangeValidationsForUsers < ActiveRecord::Migration
  def change
    remove_column :users, :email
    change_column :users, :username, :string, {null: false, default: ""}
    add_index :users, :username, unique: true
  end
end
