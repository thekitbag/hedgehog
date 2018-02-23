function populateList(container, endpoint) {
	$.get(endpoint, function(data) {
		var results = data;
  		var resultsLength = results.length
 		for (var i = 0; i < resultsLength; i++) {
 			if (container == "typeContainer") {
 				var listItem = document.createElement("div");
 				listItem.setAttribute("class", "list-item");
 				listItem.innerHTML = results[i];
 				document.getElementById(container).appendChild(listItem)
 			} else if (container == "epicContainer") {
 				var listItem = document.createElement("div");
 				listItem.setAttribute("class", "list-item");
 				listItem.innerHTML = results[i];
 				document.getElementById(container).appendChild(listItem)
 			} else  console.log("list does not exist"); 			 			
 		}
 	});
 }

 $(document).ready(function() {
	populateList("typeContainer","/getTypes");
	populateList("epicContainer","/getEpics");		
});

 $(function(){
	$('#btnAddEpic').click(function(){
		var epic = $('#addEpic').val();
		var data = {"epic":epic};
		$.ajax({
			type: 'POST',
		    contentType: 'application/json',
		    url: '/addEpic',
		    dataType : 'json',
		    data : JSON.stringify(data),
		    success: function(response){
				console.log(response);
			},
			error: function(error){
				console.log(error);
			}
		});
	});
});

  $(function(){
	$('#btnAddType').click(function(){
		var epic = $('#addType').val();
		var data = {"type":epic};
		$.ajax({
			type: 'POST',
		    contentType: 'application/json',
		    url: '/addType',
		    dataType : 'json',
		    data : JSON.stringify(data),
		    success: function(response){
				console.log(response);
			},
			error: function(error){
				console.log(error);
			}
		});
	});
});

