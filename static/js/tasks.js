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


function setShellWidth(entry, id) {
	if (entry[3] == 5 ){
		document.getElementById(id).style.width = "10%";
		} else if (entry[3] == 15 ){
		document.getElementById(id).style.width = "15%";
		} else if (entry[3] == 30 ){
		document.getElementById(id).style.width = "25%";
		} else if (entry[3] == 60 ){
		document.getElementById(id).style.width = "45%";
		} else if (entry[3] == 120 ){
		document.getElementById(id).style.width = "65%";
		} else if (entry[3] == 240 ){
		document.getElementById(id).style.width = "80%";
		} else if (entry[3] == 500 ){
		document.getElementById(id).style.width = "100%";
		}
		else if (entry[3] == 1000 ){
		document.getElementById(id).style.width = "100%";
		}
		else {
		document.getElementById(id).style.border = "dotted";
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
 				setShellWidth(results[i], "ipone" + i);
 				createTaskContent("task", "iptwo" + i, "ipone" + i, results[i][0]);
 				setClass(results[i], "iptwo" + i);
 				createButton("btn pause", "pause" + i, "ipone" + i, "Pause");
 				createButton("btn done", "done" + i, "ipone" + i, "Done"); 				
 			} else if (container == "todaysTasksContainer") {
 				createTaskShell("task-box", "tdtone" + i, container);
 				setShellWidth(results[i], "tdtone" + i);
 				createTaskContent("task", "tdttwo" + i, "tdtone" + i, results[i][0]);
 				setClass(results[i], "tdttwo" + i);
 				createButton("btn start", "start" + i, "tdtone" + i, "Start");
 				createButton("btn backlog", "backlog" + i, "tdtone" + i, "Backlog"); 				
 			} else if (container == "tasksContainer") {
 				createTaskShell("task-box", "atone" + i, container);
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

$(document).on("click","#quickAddBtn",function(){
	location.href="showAddTask";
});


	
