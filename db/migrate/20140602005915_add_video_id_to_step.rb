class AddVideoIdToStep < ActiveRecord::Migration
  def change
    add_column :steps, :video_id, :string
  end
end
