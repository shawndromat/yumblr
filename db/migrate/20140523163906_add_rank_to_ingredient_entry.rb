class AddRankToIngredientEntry < ActiveRecord::Migration
  def change
    add_column :ingredient_entries, :rank, :integer
  end
end
