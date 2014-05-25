# == Schema Information
#
# Table name: ingredient_entries
#
#  id            :integer          not null, primary key
#  amount        :integer
#  unit          :string(255)
#  recipe_id     :integer          not null
#  ingredient_id :integer          not null
#  created_at    :datetime
#  updated_at    :datetime
#  rank          :integer
#  fraction      :string(255)
#

class IngredientEntry < ActiveRecord::Base
  validates :recipe, :ingredient, presence: true
  validate :fraction_inclusion
  validate :unit_inclusion

  belongs_to :recipe
  belongs_to :ingredient

  UNITS = [
      "",
      "cup",
      "tbsp",
      "tsp",
      "lb",
      "kg",
      "large",
      "medium",
      "small",
      "pinch",
      "bunch",
      "oz",
      "clove",
      "can",
      "g",
      "ml",
      "liter",
      "gallon",
      "pint",
      "head",
      "slice",
      "jar",
      "piece"
    ]

  PLURAL_UNITS = ["cup", "pinch", "bunch", "clove", "can", "liter",
                    "gallon", "pint", "head", "slice", "jar", "piece"]

  FRACTIONS = [
      "",
      "1/8",
      "1/4",
      "1/3",
      "3/8",
      "1/2",
      "5/8",
      "2/3",
      "3/4",
      "7/8",
    ]

  def unit_inclusion
    unless (IngredientEntry::UNITS.include?(self.unit) || self.unit.nil?)
      errors[:unit] << "is not on list"
    end
  end

  def fraction_inclusion
    unless (IngredientEntry::FRACTIONS.include?(self.fraction) || self.fraction.nil?)
      errors[:fraction] << "is not on list"
    end
  end

  def ingredient_name=(name)
    self.ingredient = Ingredient.find_or_create_by_name(name)
  end

  def unit_pluralize
    return self.unit unless IngredientEntry::PLURAL_UNITS.include?(unit)
    if ((self.amount && self.amount > 1) ||
          (self.amount == 1 && self.fraction != ""))
      return self.unit.pluralize
    else
      return self.unit
    end
  end
end
