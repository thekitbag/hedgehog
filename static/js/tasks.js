//functions

function setClass(entry, id) {	
	if (entry[1] == "High" && entry[2] == "High") {
		document.getElementById(id).setAttribute("class", "task IU");
		} else if (entry[1] == "Low" && entry[2] == "Low"){
		document.getElementById(id).setAttribute("class", "task nInU");
		} else if (entry[1] == "Low" && entry[2] == "High"){
		document.getElementById(id).setAttribute("class", "task InU");
		} else if (entry[1] == "High" && entry[2] == "Low"){
		document.getElementById(id).setAttribute("class", "task nIU");
		} else {
		document.getElementById(id).setAttribute("class", "task other");
	}				
}

function setShellHeight(entry, id) {
	if (entry[3] == 1 ) {
		document.getElementById(id).style.height = "50px";
		} else if (entry[3] == 2 ){
		document.getElementById(id).style.height = "100px";
		} else if (entry[3] == 3 ){
		document.getElementById(id).style.height = "150px";
		} else if (entry[3] == 5 ){
		document.getElementById(id).style.height = "250px";
		} else if (entry[3] == 8 ){
		document.getElementById(id).style.height = "400px";
		} else if (entry[3] == 13 ){
		document.getElementById(id).style.height = "800px";
		}
		else {
		document.getElementById(id).style.height = "20px";
	}				
}

function setShellWidth(entry, id) {
	if (entry[4] == 1 ) {
		document.getElementById(id).style.width = "15%";
		} else if (entry[4] == 2 ){
		document.getElementById(id).style.width = "31%";
		} else if (entry[4] == 3 ){
		document.getElementById(id).style.width = "46%";
		} else if (entry[4] == 5 ){
		document.getElementById(id).style.width = "62%";
		} else if (entry[4] == 8 ){
		document.getElementById(id).style.width = "77%";
		} else if (entry[4] == 13 ){
		document.getElementById(id).style.width = "100%";
		}
		else {
		document.getElementById(id).style.width = "50%";
	}				
}

function createTaskShell(shellClass, id, destination) {
	var createShell = document.createElement("div");	
	createShell.setAttribute("class", shellClass);
	createShell.setAttribute("id", id);
	document.getElementById(destination).appendChild(createShell);
}

function createTaskContent(taskClass, id, destination, title) {
	var createContent = document.createElement("div");	
	createContent.setAttribute("class", taskClass);
	createContent.setAttribute("id", id);
	document.getElementById(destination).appendChild(createContent);
	createContent.innerHTML = title;
}

function createButton(btnclass, id, destination, copy) {
	var createButton = document.createElement("button");	
	createButton.setAttribute("class", btnclass);
	createButton.setAttribute("id", id);
	document.getElementById(destination).appendChild(createButton);
	createButton.innerHTML = copy;
}

function populateList(endpoint, container) {
	$.get(endpoint, function(data) {
		var results = data;
  		var resultsLength = results.length
 		for (var i = 0; i < resultsLength; i++) {
 			if (container == "inProgressTasksContainer") {
 				createTaskShell("task-box", "ipone" + i, container);
 				setShellHeight(results[i], "ipone" + i);
 				setShellWidth(results[i], "ipone" + i);
 				createTaskContent("task", "iptwo" + i, "ipone" + i, results[i][0]);
 				setClass(results[i], "iptwo" + i);
 				createButton("btn pause", "pause" + i, "ipone" + i, "Pause");
 				createButton("btn done", "done" + i, "ipone" + i, "Done");
 			} else if (container == "todaysTasksContainer") {
 				createTaskShell("task-box", "tdtone" + i, container);
 				setShellHeight(results[i], "tdtone" + i);
 				setShellWidth(results[i], "tdtone" + i);
 				createTaskContent("task", "tdttwo" + i, "tdtone" + i, results[i][0]);
 				setClass(results[i], "tdttwo" + i);
 				createButton("btn start", "start" + i, "tdtone" + i, "Start");
 				createButton("btn backlog", "backlog" + i, "tdtone" + i, "Backlog");
 			} else if (container == "tasksContainer") {
 				createTaskShell("task-box", "atone" + i, container);
 				setShellHeight(results[i], "atone" + i);
 				setShellWidth(results[i], "atone" + i);
 				createTaskContent("task", "attwo" + i, "atone" + i, results[i][0]);
 				setClass(results[i], "attwo" + i);
 				createButton("btn att", "att" + i, "atone" + i, "Add to Today");
 				createButton("btn archive", "archive" + i, "atone" + i, "Archive");
 			} 			
 		}
 	});
 }



function refreshList(list, endpoint) {
	var listToRefresh = document.getElementById(list)
	while (listToRefresh.childNodes.length > 2) {
		listToRefresh.removeChild(listToRefresh.lastChild);
	}
	populateList(endpoint, list); 
}


//functions executed when the page loads

$(document).ready(function() {
	populateList("/getInProgress", "inProgressTasksContainer");	
	populateList("/getToDoToday", "todaysTasksContainer");
	populateList("/getTasks", "tasksContainer");
});


//functions execute don user action

$(document).on("click",".start",function(){     		
     		var id = this.id; 
     		var index = id[5]; 
     		var taskId = "tdttwo" + index    		    		
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
			      refreshList("inProgressTasksContainer", "/getInProgress");
			      refreshList("todaysTasksContainer", "/getToDoToday");
			      refreshList("tasksContainer", "/getTasks");
			    },error : function(result){
			       console.log("oops");
			    }
		});	
	});

$(document).on("click",".pause",function(){     		
     		var id = this.id;
     		var index = id[5];     		
     		var taskId = "iptwo" + index;  		    		
     		var taskTitlehtml = document.getElementById(taskId);
     		var taskTitle = taskTitlehtml.innerHTML;
     		var data = {"title":taskTitle};
			$.ajax({
			    type: 'POST',
			    contentType: 'application/json',
			    url: '/stopTask',
			    dataType : 'json',
			    data : JSON.stringify(data),
			    success : function(result) {
			      refreshList("todaysTasksContainer", "/getToDoToday");
			      refreshList("inProgressTasksContainer", "/getInProgress");
			    },error : function(result){
			       console.log("oops");
			    }
		});	
	}); 

$(document).on("click",".att",function(){     		
     		var id = this.id; 
     		var index = id[3];
     		var taskId = "attwo" + index;     		    		
     		var taskTitlehtml = document.getElementById(taskId);
     		var taskTitle = taskTitlehtml.innerHTML;
     		var data = {"title":taskTitle};
			$.ajax({
			    type: 'POST',
			    contentType: 'application/json',
			    url: '/addToToday',
			    dataType : 'json',
			    data : JSON.stringify(data),
			    success : function(result) {
			      refreshList("todaysTasksContainer", "/getToDoToday");
			      refreshList("tasksContainer", "/getTasks");			      
			    },error : function(result){
			       console.log("oops");
			    }
		});	
	});

$(document).on("click",".backlog",function(){     		
     		var id = this.id; 
     		var index = id[7];
     		var taskId = "tdttwo" + index     		    		
     		var taskTitlehtml = document.getElementById(taskId);
     		var taskTitle = taskTitlehtml.innerHTML;
     		var data = {"title":taskTitle};
			$.ajax({
			    type: 'POST',
			    contentType: 'application/json',
			    url: '/moveToBacklog',
			    dataType : 'json',
			    data : JSON.stringify(data),
			    success : function(result) {
			      refreshList("todaysTasksContainer", "/getToDoToday");
			      refreshList("tasksContainer", "/getTasks");			      
			    },error : function(result){
			       console.log("oops");
			    }
		});	
	});

$(document).on("click",".done",function(){     		
     		var id = this.id; 
     		var index = id[4];
     		var taskId = "iptwo" + index;     		    		
     		var taskTitlehtml = document.getElementById(taskId);
     		var taskTitle = taskTitlehtml.innerHTML;
     		var data = {"title":taskTitle};
			$.ajax({
			    type: 'POST',
			    contentType: 'application/json',
			    url: '/finishTask',
			    dataType : 'json',
			    data : JSON.stringify(data),
			    success : function(result) {
			      refreshList("inProgressTasksContainer", "/getInProgress");			      
			    },error : function(result){
			       console.log("oops");
			    }
		});	
	});


$(document).on("click",".archive",function(){     		
     		var id = this.id; 
     		var index = id[7];
     		var taskId = "attwo" + index;     		    		
     		var taskTitlehtml = document.getElementById(taskId);
     		var taskTitle = taskTitlehtml.innerHTML;
     		var data = {"title":taskTitle};
			$.ajax({
			    type: 'POST',
			    contentType: 'application/json',
			    url: '/archiveTask',
			    dataType : 'json',
			    data : JSON.stringify(data),
			    success : function(result) {
			      refreshList("tasksContainer", "/getTasks");				      
			    },error : function(result){
			       console.log("oops");
			    }
		});	
	});


	
