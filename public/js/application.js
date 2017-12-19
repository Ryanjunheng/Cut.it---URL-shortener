$(document).ready(function(){
	$("#copybutton").click(function(){
		var copyText = document.getElementById("myInput");
		copyText.select();
		document.execCommand("Copy");
		alert("Link copied: " + copyText.value + " ;)");
	});
});

$(document).ready(function(){
	$("#shorten").on("submit", function(event){
		event.preventDefault()
		$form = $(event.target)
		$formSubmit = $form.find('input[id="button"]')
		$formSubmit.val('Loading...')
		$.ajax({
			url: $form.attr('action'),
			method: $form.attr('method'),
			data: $form.serialize(),
			dataType: "JSON",
			success: function(response){
				if (response.saved==true){
				let changeTable = "<tr><td><a href=\"" + response.long_url + "\" target=\"_blank\">" + response.long_url + "</a></td><td><a href=\"" + response.short_url + "\" target=\"_blank\">https://cut.it/" + response.short_url + "</a></td><td id=\"count\">0</td></tr>"
				let addResult = "<p id=\"succeed\">Your shortened URL:</p><input type=\"text\" value=\"cut.it/" + response.short_url + "\" id=\"myInput\"><button id=\"copybutton\">Copy</button>"
				let button = $('#button')
				$('#table').append(changeTable)
				$('#main-container').append(addResult)
				$formSubmit.val('Cut It!');
				$('#button').remove();
				$("#copybutton").click(function(){
					var copyText = document.getElementById("myInput");
					copyText.select();
					document.execCommand("Copy");
					alert("Link copied: " + copyText.value + " ;)");
					$('#succeed, #myInput, #copybutton').remove();
					$('#shorten').append(button);
					});
			}
			else if(response.saved==false){
				alert("Please enter valid URL!")
				$formSubmit.val('Cut It!');
			}
			
			},
			
			
			
			
		});
	});
});
