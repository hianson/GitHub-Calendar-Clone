class User < ApplicationRecord
  has_secure_password
  has_many :practice_sessions

  validates :email, presence: true, uniqueness: true
end
