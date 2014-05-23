class RequireRankOnEntries < ActiveRecord::Migration
  def change
    change_column :ingredient_entries, :rank, :integer, null: false
  end
end
