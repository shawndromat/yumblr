class ChangeFractionForIngredientEntry < ActiveRecord::Migration
  def change
    remove_column :ingredient_entries, :numerator, :integer
    remove_column :ingredient_entries, :denominator, :integer
    add_column :ingredient_entries, :fraction, :string
  end
end
