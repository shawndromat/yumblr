class CreateIngredientEntries < ActiveRecord::Migration
  def change
    create_table :ingredient_entries do |t|
      t.integer :amount
      t.integer :fraction
      t.string  :unit
      t.integer :recipe_id, null: false
      t.integer :ingredient_id, null: false
      t.timestamps
    end

    add_index :ingredient_entries, :recipe_id
    add_index :ingredient_entries, :ingredient_id
  end
end
