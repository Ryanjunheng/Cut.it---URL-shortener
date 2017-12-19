class CreateUrls < ActiveRecord::Migration[5.0]
	def change
		create_table :urls do |t|
			t.string :long_url  # store the actual link
			t.string :short_url # store the unique part of the short link
		end
	end
end

