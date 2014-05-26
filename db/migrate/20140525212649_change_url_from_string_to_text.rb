class ChangeUrlFromStringToText < ActiveRecord::Migration
  def change
    change_column :recipes, :photo_url, :text
  end
end
