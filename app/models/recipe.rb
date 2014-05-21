# == Schema Information
#
# Table name: recipes
#
#  id         :integer          not null, primary key
#  title      :string(255)      not null
#  photo_url  :string(255)
#  created_at :datetime
#  updated_at :datetime
#  owner_id   :integer          not null
#

class Recipe < ActiveRecord::Base
  validates :title, :owner, presence: true
  belongs_to :owner, class_name: "User"

  has_many :steps
  has_many :ingredient_entries
  has_many :ingredients, through: :ingredient_entries, source: :ingredient
end
