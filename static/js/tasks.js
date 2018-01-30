$(function(){
	$('#btnHome').click(function(){
		location.href="showHomePage";		
	});
	
	$('#btnGetTasks').click(function() { 
        $.get("/getTasks", function(data){
        	console.log(data);
        	$('#tableOfTasks tbody tr').remove();
        	var results = data;
			var resultsLength = data.length;
			var table = document.getElementById('tableOfTasks').getElementsByTagName('tbody')[0];
			for (var i = 0; i < resultsLength; i++) {
					var row = table.insertRow();
					var cell2 = row.insertCell();
					cell2.innerHTML  = '<button id=a>Start</button'								
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