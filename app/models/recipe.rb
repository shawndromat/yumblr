class Recipe < ActiveRecord::Base
  validates :title, :owner, presence: true
  belongs_to :owner, class_name: "User"
end
