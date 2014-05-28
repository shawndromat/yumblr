class User < ActiveRecord::Base
  attr_reader :password

  validates :username, :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }, on: :create
  before_validation :ensure_session_token

  has_many :owned_recipes, class_name: "Recipe", foreign_key: :owner_id

  def self.find_by_credentials(creds)
    user = User.find_by_username(creds[:username])
    if user.try(:is_password?, creds[:password])
      user
    else
      nil
    end
  end

  def password=(plain_text)
    @password = plain_text
    self.password_digest = BCrypt::Password.create(plain_text)
  end

  def is_password?(plain_text)
    BCrypt::Password.new(self.password_digest).is_password?(plain_text)
  end

  def reset_session_token!
    self.session_token = SecureRandom.hex
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.hex
  end
end
