

function populateList(endpoint) {
  $.get(endpoint, function(data) {
  	var results = data;  
    var resultsLength = data.length;
    var allTasksList = "tasksContainer";
    var inProgressList = "inProgressTasksContainer";
    var todaysTaskList = "todaysTasksContainer";
    for (var i = 0; i < resultsLength; i++) {			
			var task = document.createElement("div");
			if (results[i][1] == "High" && results[i][2] == "High") {
				task.setAttribute("class", "task IU")
				} else if (results[i][1] == "Low" && results[i][2] == "Low"){
				task.setAttribute("class", "task nInU")
				} else if (results[i][1] == "Low" && results[i][2] == "High"){
				task.setAttribute("class", "task InU")
				} else if (results[i][1] == "High" && results[i][2] == "Low"){
				task.setAttribute("class", "task nIU")
				} else {
				task.setAttribute("class", "task other")
			};			
			task.innerHTML = results[i][0];
			if (endpoint == "/getTasks") {
				var taskId = "atask" + i			
				task.setAttribute("id", taskId);
				var startBtn = document.createElement("button");
				var startId = "astart" + i
				startBtn.setAttribute("class", "btn start")
				startBtn.setAttribute("id", startId);
				startBtn.innerHTML = "Start"
				var attBtn = document.createElement("button");
				var attBtnId = "attBtn" + i
				attBtn.setAttribute("class", "btn att")
				attBtn.setAttribute("id", attBtnId);
				attBtn.innerHTML = "Add to Today"					
				document.getElementById(allTasksList).appendChild(task);
				document.getElementById(allTasksList).appendChild(startBtn);
				document.getElementById(allTasksList).appendChild(attBtn);
			} else if (endpoint == "/getInProgress") {
				var taskId = "btask" + i			
				task.setAttribute("id", taskId);
				var pauseBtn = document.createElement("button");
				var pauseId = "pause" + i
				pauseBtn.setAttribute("class", "btn pause")
				pauseBtn.setAttribute("id", pauseId);
				pauseBtn.innerHTML = "Pause"					
				document.getElementById(inProgressList).appendChild(task);
				document.getElementById(inProgressList).appendChild(pauseBtn);
			} 	else if (endpoint == "/getToDoToday") {
				var taskId = "ctask" + i			
				task.setAttribute("id", taskId);
				var startBtn = document.createElement("button");
				var startId = "cstart" + i
				startBtn.setAttribute("class", "btn start")
				startBtn.setAttribute("id", startId);
				startBtn.innerHTML = "Start"					
				document.getElementById(todaysTaskList).appendChild(task);
				document.getElementById(todaysTaskList).appendChild(startBtn);		
			};
		};
	});
}

$( document ).ready(function() {
	populateList("/getTasks");
	populateList("/getInProgress");    
	populateList("/getToDoToday");
});

$(document).on("click",".start",function(){     		
     		var id = this.id; 
     		var index = id[6];
     		if(id[0] == "a") {
     			var taskId = "atask" + index;
     		} else {
     			var taskId = "ctask" + index;
     		};     		
     		var taskTitlehtml = document.getElementById(taskId);
     		var taskTitle = taskTitlehtml.innerHTML;
     		var data = {"title":taskTitle};
			$.ajax({
			    type: 'POST',
			    contentType: 'application/json',
			    url: '/startTask',
			    dataType : 'json',
			    data : JSON.stringify(data),
			    success : function(result) {
			      populateList("/getInProgress");
			    },error : function(result){
			       console.log("oops");
			    }
		});
     		
			/*var row = table.getElementsByTagName('tr')[rowId]
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
		}); */
	}); 


			
