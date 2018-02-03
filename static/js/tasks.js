$(function(){	
	$('#btnGetTasks').click(function() { 
        $.get("/getTasks", function(data){        	
        	$('#tableOfTasks tbody tr').remove();
        	var results = data;  
        	var resultsLength = data.length;			
			var table = document.getElementById('tableOfTasks').getElementsByTagName('tbody')[0];
			for (var i = 0; i < resultsLength; i++) {
					var row = table.insertRow();													
						for (var j = 1; j < 12; j++){					
						var cell1 = row.insertCell();					
						cell1.innerHTML = results[i][j]						
					};
					var cell2 = row.insertCell();					
					var buttonId = '\"' + "start" + i + '\"'
					var buttonClass='\"actionButton\"'
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
				var cell3 = row.insertCell();					
				var buttonId = '\"' + "stop" + i + '\"'
				var buttonClass='\"brsb\"'
				var buttonHTML = "<button class=" + buttonClass + " id=" + buttonId + ">Stop</button>"					
				cell3.innerHTML  = buttonHTML
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
				var cell2 = row.insertCell();					
				var buttonId = '\"' + "start" + i + '\"'
				var buttonClass='\"actionButton\"'
				var buttonHTML = "<button class=" + buttonClass + " id=" + buttonId + ">Start</button>"					
				cell2.innerHTML  = buttonHTML
			};
        });
    });
     $(document).on("click",".actionButton",function(){     		
     		var id = this.id; 
     		var rowId = id[5];
     		var table = document.getElementById('tableOfTasks').getElementsByTagName('tbody')[0]
			var row = table.getElementsByTagName('tr')[rowId]
			var titleCell = row.getElementsByTagName('td')[0]
			var title = titleCell.innerHTML
			var data = {"title":title};
			$.ajax({
			    type: 'POST',
			    contentType: 'application/json',
			    url: '/startTask',
			    dataType : 'json',
			    data : JSON.stringify(data),
			    success : function(result) {
			      var resultText = result.text
			      alert(resultText); 
			    },error : function(result){
			       console.log("oops");
			    }
		});
	});

    $('#btnHome').click(function(){
		location.href="showHomePage";		
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
