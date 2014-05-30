class AddPrivacyToRecipes < ActiveRecord::Migration
  def change
    add_column :recipes, :private, :boolean, default: false
  end
end
