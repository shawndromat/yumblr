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
#  numerator     :integer
#  denominator   :integer
#

class IngredientEntry < ActiveRecord::Base
  validates :recipe, :ingredient, presence: true
  #fraction is numerator over a denominator of 24
  #included in [1/8, 1/4, 1/3, 3/8, 1/2, 5/8, 2/3, 3/4, 7/8]
  validates :numerator, inclusion: { in: (1...8), allow_nil: true }
  validates :denominator, inclusion: { in: [2, 3, 4, 8], allow_nil: true }
  validate :valid_fraction
  validate :unit_inclusion

  belongs_to :recipe
  belongs_to :ingredient

  def translate_fraction
    "#{self.numerator}/#{self.denominator}" if self.denominator
  end

  def self.units
    [
      'cup',
      'tbsp',
      'tsp',
      'lb',
      'kg',
      'large',
      'medium',
      'small',
      'pinch',
      'bunch',
      'oz',
      'clove',
      'can',
      'g',
      'ml',
      'liter',
      'gallon',
      'pint',
      'head',
      'slice'
    ]
  end

  def unit_inclusion
    unless (IngredientEntry.units.include?(self.unit) || self.unit.nil?)
      errors[:unit] << "is not on list"
    end
  end

  def valid_fraction
    return if self.numerator.nil? && self.denominator.nil?
    if (
          (self.numerator && !self.denominator) ||
          (!self.numerator && self.denominator)
         )
      errors[:fraction] << "is invalid"
    elsif self.numerator >= self.denominator
      errors[:fraction] << "is invalid"
    end
  end
end
