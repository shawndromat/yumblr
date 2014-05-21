class CreateSteps < ActiveRecord::Migration
  def change
    create_table :steps do |t|
      t.text :body, null: false
      t.integer :recipe_id, null: false
      t.integer :rank, null: false

      t.timestamps
    end

    add_index :steps, :recipe_id
    add_index :steps, [:recipe_id, :rank], unique: true
  end
end
