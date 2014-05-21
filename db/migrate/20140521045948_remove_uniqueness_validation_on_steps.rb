class RemoveUniquenessValidationOnSteps < ActiveRecord::Migration
  def change
    remove_index :steps, [:recipe_id, :rank]
  end
end
