# == Schema Information
#
# Table name: ingredients
#
#  id         :integer          not null, primary key
#  name       :string(255)      not null
#  created_at :datetime
#  updated_at :datetime
#

class Ingredient < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true

  has_many :ingredient_entries
  has_many :recipes, through: :ingredient_entries, source: :recipe

  def self.find_or_create_by_name(name)
    ingredient = Ingredient.find_by_name(name.titleize)
    return ingredient if ingredient
    Ingredient.create!(name: name.titleize)
  end
end
