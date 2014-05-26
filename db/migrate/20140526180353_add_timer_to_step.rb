class AddTimerToStep < ActiveRecord::Migration
  def change
    add_column :steps, :timer, :integer
  end
end
