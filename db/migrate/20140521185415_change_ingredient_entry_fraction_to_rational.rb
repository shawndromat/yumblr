class ChangeIngredientEntryFractionToRational < ActiveRecord::Migration
  def change
    remove_column :ingredient_entries, :fraction
    add_column :ingredient_entries, :numerator, :integer
    add_column :ingredient_entries, :denominator, :integer
  end
end
