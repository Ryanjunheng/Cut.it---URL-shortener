require 'securerandom'

class Url < ActiveRecord::Base
	# This is Sinatra! Remember to create a migration!
	before_create :shorten
	validates :long_url, format: { with: /(http\:\/\/)?(https\:\/\/)?.+/, message: "Invalid URL!"}

	def shorten
		self.short_url = SecureRandom.urlsafe_base64(4)
	end
end


