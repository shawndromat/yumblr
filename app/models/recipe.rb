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
  validate :non_default_title
  belongs_to :owner, class_name: "User"

  has_many :steps, inverse_of: :recipe
  has_many :ingredient_entries, inverse_of: :recipe
  has_many :ingredients, through: :ingredient_entries, source: :ingredient

  accepts_nested_attributes_for :steps,
      reject_if: proc { |attributes| attributes['body'].blank? }

  accepts_nested_attributes_for :ingredient_entries,
      reject_if: proc { |attributes| attributes['ingredient_name'].blank? }

  def non_default_title
    errors[:title] << "can't be default value" if self.title == "Recipe Title"
  end
end
