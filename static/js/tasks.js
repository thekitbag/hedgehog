$(function(){
	$('#btnHome').click(function(){
		location.href="showHomePage";		
	});
	
	$('#btnGetTasks').click(function() { 
        $.get("/getTasks", function(data){        	
        	$('#tableOfTasks tbody tr').remove();
        	var results = data;  
        	var resultsLength = data.length;
        	var newcolHTML = "<th id=" + '\"' + "CTA" + '\">' + "CTA</th>"
        	if (document.getElementById('CTA') == null) {
        		var newcol = $('#tableOfTasks thead tr').append(newcolHTML); 
        	}			
			var table = document.getElementById('tableOfTasks').getElementsByTagName('tbody')[0];
			for (var i = 0; i < resultsLength; i++) {
					var row = table.insertRow();													
						for (var j = 1; j < 12; j++){					
						var cell1 = row.insertCell();					
						cell1.innerHTML = results[i][j]						
					};
					var cell2 = row.insertCell();					
					var buttonId = '\"' + i + '\"'
					var buttonClass='\"bggb\"'
					var buttonHTML = "<button class=" + buttonClass + " id=" + buttonId + ">Start</button>"					
					cell2.innerHTML  = buttonHTML
			};
        });
    });
    
    $('#btnGetInProgress').click(function() { 
        $.get("/getInProgress", function(data){
        	console.log(data);
        	$('#tableOfTasks tbody tr').remove();
        	$('#tableOfTasks').find('#CTA').remove();
        	var results = data;
			var resultsLength = data.length;
			var table = document.getElementById('tableOfTasks').getElementsByTagName('tbody')[0];
			for (var i = 0; i < resultsLength; i++) {				
				var row = table.insertRow();							
				for (var j = 1; j < 12; j++){					
				var cell1 = row.insertCell();					
				cell1.innerHTML = results[i][j]						
				};
			};
        });
    });

    $('#btnGetHardDeadlines').click(function() { 
        $.get("/getHardDeadlines", function(data){
        	console.log(data);
        	$('#tableOfTasks tbody tr').remove();
        	$('#tableOfTasks').find('#CTA').remove();
        	var results = data;
			var resultsLength = data.length;			
			var table = document.getElementById('tableOfTasks').getElementsByTagName('tbody')[0];
			for (var i = 0; i < resultsLength; i++) {				
				var row = table.insertRow();							
				for (var j = 1; j < 12; j++){					
				var cell1 = row.insertCell();					
				cell1.innerHTML = results[i][j]						
				};
			};
        });
    });






	$('#killserver').click(function(){
		
		$.ajax({
			url: '/shutdown',
			data: $('form').serialize(),
			type: 'POST',
			success: function(response){
				console.log(response)
			},
			error: function(error){
				console.log(error);
			}
		});		
	});
});

$("button").click(function(){
    $.get("demo_test.asp", function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
    });
});