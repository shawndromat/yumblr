class Ingredient < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true

  def self.find_or_create_by_name(name)
    ingredient = Ingredient.find_by_name(name)
    return ingredient if ingredient
    Ingredient.create!(name: name)
  end
end
