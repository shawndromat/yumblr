class AddVideoToSteps < ActiveRecord::Migration
  def change
    add_column :steps, :video_url, :text
  end
end
