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
				if (response.saved==true && response.repeat==false){
				let changeTable = "<tr><td><a href=\"" + response.long_url + "\" target=\"_blank\">" + response.long_url + "</a></td><td><a href=\"" + response.short_url + "\" target=\"_blank\">https://linkcutit.herokuapp.com/" + response.short_url + "</a></td><td id=\"count\">0</td></tr>"
				let addResult = "<div id=\"result-container\"><p id=\"succeed\">Your shortened URL:</p><input type=\"text\" value=\"linkcutit.herokuapp.com/" + response.short_url + "\" id=\"myInput\"><button id=\"copybutton\">Copy</button></div>"
				let button = $('#button')
				$('#result-container').remove();
				$('#table').append(changeTable)
				$('#main-container').append(addResult)
				$formSubmit.val('Cut It!');
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
			else if(response.saved==true && response.repeat==true){
				let addResult = "<div id=\"result-container\"><p id=\"succeed\">Your shortened URL:</p><input type=\"text\" value=\"linkcutit.herokuapp.com/" + response.short_url + "\" id=\"myInput\"><button id=\"copybutton\">Copy</button></div>"
				let button = $('#button')
				$('#result-container').remove();
				$('#main-container').append(addResult)
				$formSubmit.val('Cut It!');
				$("#copybutton").click(function(){
					var copyText = document.getElementById("myInput");
					copyText.select();
					document.execCommand("Copy");
					alert("Link copied: " + copyText.value + " ;)");
					$('#succeed, #myInput, #copybutton').remove();
					$('#shorten').append(button);
					});
			}
			},
			
			
			
			
		});
	});
});
