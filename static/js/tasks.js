function populateList(endpoint) {
  $.get(endpoint, function(data) {
  	var results = data;  
    var resultsLength = data.length;
    var allTasksList = "tasksContainer";
    var inProgressList = "inProgressTasksContainer";
    var todaysTaskList = "todaysTasksContainer";
    for (var i = 0; i < resultsLength; i++) {			
			var task = document.createElement("div");
			var taskId = "task" + i
			task.setAttribute("class", "task-nInU")
			task.setAttribute("id", taskId);
			task.innerHTML = results[i][0];
			if (endpoint == "/getTasks") {
				var startBtn = document.createElement("button");
				var startId = "Start" + i
				startBtn.setAttribute("class", "startBtn")
				startBtn.setAttribute("id", startId);
				startBtn.innerHTML = "Start"					
				document.getElementById(allTasksList).appendChild(task);
				document.getElementById(allTasksList).appendChild(startBtn);
			} else if (endpoint == "/getInProgress") {
				var pauseBtn = document.createElement("button");
				var pauseId = "pause" + i
				pauseBtn.setAttribute("class", "startBtn")
				pauseBtn.setAttribute("id", pauseId);
				pauseBtn.innerHTML = "Pause"					
				document.getElementById(inProgressList).appendChild(task);
				document.getElementById(inProgressList).appendChild(pauseBtn);
			} 	else if (endpoint == "/getToDoToday") {
				var startBtn = document.createElement("button");
				var startId = "Start" + i
				startBtn.setAttribute("class", "startBtn")
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
	console.log("It worked");
	populateList("/getInProgress");
	console.log("It worked too");    
	populateList("/getToDoToday");
	console.log("Zomg no way, that too");
});


			
