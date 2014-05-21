class AddUserIdToRecipe < ActiveRecord::Migration
  def change
    add_column :recipes, :owner_id, :integer, null: false
    add_index :recipes, :owner_id
  end
end
