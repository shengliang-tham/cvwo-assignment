class User < ApplicationRecord
  attr_accessor :password

  validates :email, uniqueness: true
  validates :password, presence: true, on: :create

  before_validation(on: :create) do
    encrypt_password
  end

  def authenticate(password)
    password_hash == BCrypt::Engine.hash_secret(password, password_salt)
  end

  private

  def encrypt_password
    self.password_salt = BCrypt::Engine.generate_salt
    self.password_hash = BCrypt::Engine.hash_secret(password, password_salt)
  end
end
