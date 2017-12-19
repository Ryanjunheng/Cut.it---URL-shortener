get '/' do
	erb	:"static/index"
end

get '/failed' do
	erb :"static/failed"
end

post '/submit' do

	if (/.+/ =~ params[:user_input]) == nil 

		{saved:false}.to_json
	else

	new_url = Url.find_by(long_url: params[:user_input]) 
	if new_url.nil?

		if (/(https?\:\/\/)/ =~ params[:user_input]) == nil 

			url = Url.new(long_url: "https://" + params[:user_input])

			if url.save
				 {short_url: url.short_url, long_url: url.long_url, saved: true}.to_json
			else
				@error = url.errors[:long_url][0]
				{saved: false}.to_json
			end	

		else 
			url = Url.new(long_url: params[:user_input])

			if url.save
				{short_url: url.short_url, long_url: url.long_url, saved: true}.to_json
			else
				@error = url.errors[:long_url][0]
				{saved: false}.to_json
			end	
		end

	# else
	# 	@link = new_url.short_url
	# 	{short_url: @link}.to_json
	end
end
end



get '/:short_url' do
	clicked_url = Url.find_by(short_url: params[:short_url])

	if clicked_url.nil?
		redirect "/failed"
	else
		clicked_url.count += 1
		clicked_url.save
		redirect clicked_url.long_url

	end
end

post '/to_home' do
	redirect '/'
end

