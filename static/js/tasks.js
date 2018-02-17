$(function(){	
	$('#btnGetTasks').click(function() { 
        $.get("/getTasks", function(data){        	
        	$('#tableOfTasks tbody tr').remove();
        	var results = data;  
        	var resultsLength = data.length;			
			var table = document.getElementById('tableOfTasks').getElementsByTagName('tbody')[0];
			for (var i = 0; i < resultsLength; i++) {
					var row = table.insertRow();				
					var cell1 = row.insertCell();					
					cell1.innerHTML = results[i]
					var cell2 = row.insertCell();	
					var attButtonClass='\"attbtn\"'				
					var startButtonId = '\"' + "start" + i + '\"'
					var addToTodayButtonId = '\"' + "att" + i + '\"'
					var buttonClass='\"actionButton\"'
					var buttonHTML = "<button class=" + buttonClass + " id=" + startButtonId + ">Start</button><button class=" + attButtonClass + " id=" + addToTodayButtonId + ">Add to Today's Tasks</button>"					
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
				var cell1 = row.insertCell();					
				cell1.innerHTML = results[i]							
				var cell3 = row.insertCell();
				var doneBtnClass = '\"doneBtn\"'
				var doneBtnId = '\"' + "done" + i + '\"'				
				var buttonId = '\"' + "stop" + i + '\"'
				var buttonClass='\"brsb\"'
				var buttonHTML = "<button class=" + buttonClass + " id=" + buttonId + ">Stop</button><button class=" + doneBtnClass + " id=" + doneBtnId + ">Done</button>"					
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
				var cell1 = row.insertCell();					
				cell1.innerHTML = results[i]
				var cell2 = row.insertCell();					
				var buttonId = '\"' + "start" + i + '\"'
				var buttonClass='\"actionButton\"'
				var buttonHTML = "<button class=" + buttonClass + " id=" + buttonId + ">Start</button>"					
				cell2.innerHTML  = buttonHTML
			};
        });
    });

    $('#btnGetToDoToday').click(function() { 
        $.get("/getToDoToday", function(data){
        	console.log(data);
        	$('#tableOfTasks tbody tr').remove();
        	$('#tableOfTasks').find('#CTA').remove();
        	var results = data;
			var resultsLength = data.length;			
			var table = document.getElementById('tableOfTasks').getElementsByTagName('tbody')[0];
			for (var i = 0; i < resultsLength; i++) {				
				var row = table.insertRow();
				var cell1 = row.insertCell();					
				cell1.innerHTML = results[i]
				var cell2 = row.insertCell();					
				var buttonId = '\"' + "start" + i + '\"'
				var buttonClass='\"actionButton\"'
				var buttonHTML = "<button class=" + buttonClass + " id=" + buttonId + ">Start</button>"					
				cell2.innerHTML  = buttonHTML
			};
        });
    });

    $('#btnGetDone').click(function() { 
        $.get("/getDone", function(data){
        	console.log(data);
        	$('#tableOfTasks tbody tr').remove();
        	$('#tableOfTasks').find('#CTA').remove();
        	var results = data;
			var resultsLength = data.length;			
			var table = document.getElementById('tableOfTasks').getElementsByTagName('tbody')[0];
			for (var i = 0; i < resultsLength; i++) {				
				var row = table.insertRow();
				var cell1 = row.insertCell();					
				cell1.innerHTML = results[i]
				var cell2 = row.insertCell();					
				var buttonId = '\"' + "reopen" + i + '\"'
				var buttonClass='\"btnReopen\"'
				var buttonHTML = "<button class=" + buttonClass + " id=" + buttonId + ">Re-open</button>"					
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
			    },error : function(result){
			       console.log("oops");
			    }
		});
	});

	$(document).on("click",".attbtn",function(){     		
     		var id = this.id; 
     		var rowId = id[3];
     		var table = document.getElementById('tableOfTasks').getElementsByTagName('tbody')[0]
			var row = table.getElementsByTagName('tr')[rowId]
			var titleCell = row.getElementsByTagName('td')[0]
			var title = titleCell.innerHTML
			var data = {"title":title};
			$.ajax({
			    type: 'POST',
			    contentType: 'application/json',
			    url: '/addToToday',
			    dataType : 'json',
			    data : JSON.stringify(data),
			    success : function(result) {
			      var resultText = result.text
			    },error : function(result){
			       console.log("oops");
			    }
		});
	}); 

     $(document).on("click",".doneBtn",function(){     		
     		var id = this.id; 
     		var rowId = id[4];
     		var table = document.getElementById('tableOfTasks').getElementsByTagName('tbody')[0]
			var row = table.getElementsByTagName('tr')[rowId]
			var titleCell = row.getElementsByTagName('td')[0]
			var title = titleCell.innerHTML
			var data = {"title":title};
			$.ajax({
			    type: 'POST',
			    contentType: 'application/json',
			    url: '/finishTask',
			    dataType : 'json',
			    data : JSON.stringify(data),
			    success : function(result) {
			      var resultText = result.text			       
			    },error : function(result){
			       console.log("oops");
			    }
		});
	});

     $(document).on("click",".brsb",function(){     		
     		var id = this.id; 
     		var rowId = id[4];
     		var table = document.getElementById('tableOfTasks').getElementsByTagName('tbody')[0]
			var row = table.getElementsByTagName('tr')[rowId]
			var titleCell = row.getElementsByTagName('td')[0]
			var title = titleCell.innerHTML
			var data = {"title":title};
			$.ajax({
			    type: 'POST',
			    contentType: 'application/json',
			    url: '/stopTask',
			    dataType : 'json',
			    data : JSON.stringify(data),
			    success : function(result) {
			      var resultText = result.text			       
			    },error : function(result){
			       console.log("oops");
			    }
		});
	});

     $(document).on("click",".btnReopen",function(){     		
     		var id = this.id; 
     		var rowId = id[6];
     		var table = document.getElementById('tableOfTasks').getElementsByTagName('tbody')[0]
			var row = table.getElementsByTagName('tr')[rowId]
			var titleCell = row.getElementsByTagName('td')[0]
			var title = titleCell.innerHTML
			var data = {"title":title};
			$.ajax({
			    type: 'POST',
			    contentType: 'application/json',
			    url: '/reopenTask',
			    dataType : 'json',
			    data : JSON.stringify(data),
			    success : function(result) {
			      var resultText = result.text			       
			    },error : function(result){
			       console.log("oops");
			    }
		});
	});
});
