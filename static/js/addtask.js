$(function(){
	$('#btnAddTask').click(function(){
		$.ajax({
			url: '/addTask',
			data: $('form').serialize(),
			type: 'POST',
			success: function(response){
				console.log(response);
				location.href="showTasks";
			},
			error: function(error){
				console.log(error);
			}
		});
	});
});

function populateDropdown(list, endpoint) {
	$.get(endpoint, function(data) {
		var results = data;
  		var resultsLength = results.length
 		for (var i = 0; i < resultsLength; i++) {
 			if (list == "typeList") {
 				var listItem = document.createElement("option");
 				listItem.setAttribute("value", results[i]);
 				listItem.innerHTML = results[i];
 				document.getElementById(list).appendChild(listItem)
 			} else if (list == "epicList") {
 				var listItem = document.createElement("option");
 				listItem.setAttribute("value", results[i]);
 				listItem.innerHTML = results[i];
 				document.getElementById(list).appendChild(listItem)
 			} else  console.log("list does not exist"); 			 			
 		}
 	});
 }

 $(document).ready(function() {
	populateDropdown("typeList","/getTypes");
	populateDropdown("epicList","/getEpics");	
	
});

$(function(){
	$('#btnEditTask').click(function(){
		$.ajax({
			url: '/editTask',
			data: $('form').serialize(),
			type: 'POST',
			success: function(response){
				console.log(response);
				$("#editTaskOverlay").hide(100);
			},
			error: function(error){
				console.log(error);
			}
		});
	});
});

