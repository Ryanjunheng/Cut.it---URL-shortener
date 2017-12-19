class AddCounts < ActiveRecord::Migration[5.0]
	def change
		add_column :urls, :count, :integer, :default => 0
	end
end

	