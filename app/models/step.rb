# == Schema Information
#
# Table name: steps
#
#  id         :integer          not null, primary key
#  body       :text             not null
#  recipe_id  :integer          not null
#  rank       :integer          not null
#  created_at :datetime
#  updated_at :datetime
#

class Step < ActiveRecord::Base
  validates :body, :recipe, :rank, presence: true

  belongs_to :recipe
  has_one :owner, through: :recipe, source: :owner
end
