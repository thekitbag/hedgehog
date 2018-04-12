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

function createLabel(destination, copy) {
	var label = document.createElement("p");
	label.setAttribute("class", "label");
	document.getElementById(destination).appendChild(label);
	label.innerHTML = copy;
}

function createTypeIcon(destination, copy){
	var label = document.createElement("p");
	label.setAttribute("class", "typeIcon");
	document.getElementById(destination).appendChild(label);
	label.innerHTML = copy;
}

function createDeadline(destination, copy, dltype){
	var label = document.createElement("p");
	label.setAttribute("class", "deadline");
	document.getElementById(destination).appendChild(label);
	label.innerHTML = copy;
	if (dltype == "HARD") {
		label.cssClass = "deadline bold";
	}
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
 				createLabel("ipone" + i, results[i][5]);
 				createTypeIcon("ipone" + i, results[i][6]);
 				createDeadline("ipone" + i, results[i][7], results[i][8]);
 			} else if (container == "todaysTasksContainer") {
 				createTaskShell("task-box", "tdtone" + i, container);
 				setShellWidth(results[i], "tdtone" + i);
 				createTaskContent("task", "tdttwo" + i, "tdtone" + i, results[i][0]);
 				setClass(results[i], "tdttwo" + i);
 				createButton("btn start", "start" + i, "tdtone" + i, "Start");
 				createButton("btn backlog", "backlog" + i, "tdtone" + i, "Backlog");
 				createLabel("tdtone" + i, results[i][5]);
 				createTypeIcon("tdtone" + i, results[i][6]);
 				createDeadline("tdtone" + i, results[i][7], results[i][8]); 				
 			} else if (container == "tasksContainer") {
 				createTaskShell("task-box", "atone" + i, container);
 				setShellWidth(results[i], "atone" + i);
 				createTaskContent("task", "attwo" + i, "atone" + i, results[i][0]);
 				setClass(results[i], "attwo" + i);
 				createButton("btn att", "att" + i, "atone" + i, "Add to Today");
 				createButton("btn archive", "archive" + i, "atone" + i, "Archive");
 				createLabel("atone" + i, results[i][5]);
 				createTypeIcon("atone" + i, results[i][6]);
 				createDeadline("atone" + i, results[i][7], results[i][8]);  				
 			} 			
 		}
 	});
 }

function applyFilter(filteredTasks) {
	var listToRefresh = document.getElementById("tasksContainer")
	while (listToRefresh.childNodes.length > 2) {
		listToRefresh.removeChild(listToRefresh.lastChild);
	}
	var resultsLength = filteredTasks.length
	for (var i = 0; i < resultsLength; i++) {
		createTaskShell("task-box", "atone" + i, "tasksContainer");
	setShellWidth(filteredTasks[i], "atone" + i);
	createTaskContent("task", "attwo" + i, "atone" + i, filteredTasks[i][0]);
	setClass(filteredTasks[i], "attwo" + i);
	createButton("btn att", "att" + i, "atone" + i, "Add to Today");
	createButton("btn archive", "archive" + i, "atone" + i, "Archive");
	createLabel("atone" + i, filteredTasks[i][5]);
	createTypeIcon("atone" + i, filteredTasks[i][6]);
	createDeadline("atone" + i, filteredTasks[i][7], filteredTasks[i][8]);
	}
}

function refreshList(list, endpoint) {
	var listToRefresh = document.getElementById(list)
	while (listToRefresh.childNodes.length > 2) {
		listToRefresh.removeChild(listToRefresh.lastChild);
	}
	populateList(endpoint, list); 
}

function populateButtons(container, endpoint, styling) {
	$.get(endpoint, function(data) {
		var results = data;
  		var resultsLength = results.length
 		for (var i = 0; i < resultsLength; i++) {
 			var listItem = document.createElement("div");
			listItem.setAttribute("class", styling);
			listItem.innerHTML = results[i];
			document.getElementById(container).appendChild(listItem)
 			 			 			
 		}
 	});
 }


function totalTime() {
	
}

//functions executed when the page loads

$(document).ready(function() {
	populateList("/getInProgress", "inProgressTasksContainer");	
	populateList("/getToDoToday", "todaysTasksContainer");
	populateList("/getTasks", "tasksContainer");
	populateButtons("filter-buttons","/getEpics", "epic filter");
	populateButtons("filter-buttons","/getTypes", "type filter");	
});


//update task status actions

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


//edit task
$(document).on("click",".task",function(){
 		$("#editTaskOverlay").show(100);
 		task = this.innerHTML
 		var data = {"task":task};
 		myForm = document.forms['editTaskField'];
 		title = myForm[0]
 		description = myForm[1]
 		complexity = myForm[2]
 		time = myForm[3]
 		urgency = myForm[4]
 		importance = myForm[5]
 		type= myForm[6]
 		epic = myForm[7]
 		deadline = myForm[8]
 		deadline_type = myForm[9]
 		taskid = myForm[10]
		$.ajax({
			type: 'POST',
		    contentType: 'application/json',
		    url: '/getTaskDetails',
		    dataType : 'json',
		    data : JSON.stringify(data),
		    success: function(response){
				title.value = response[0][1];
				description.value = response[0][2];
				type.value = response[0][3];
				epic.value = response[0][4];
				complexity.value = response[0][5];
				time.value = response[0][6];
				urgency.value = response[0][7];
				importance.value = response[0][8];
				deadline.value = response[0][9];
				deadline_type.value = response[0][10];
				taskid.value = response[0][0]
				
			},
			error: function(error){
				console.log(error);
			}
		}) 

	});

$(document).on("click","#close",function(){ 		
 		$("#editTaskOverlay").hide(100);
	});


//quick add button

$(document).on("click","#quickAddBtn",function(){
	location.href="showAddTask";
});

//filters


$(document).on("click",".epic",function(){
	epicName = this.innerHTML;
	var data = {"epic":epicName};
	$.ajax({
		type: 'POST',
	    contentType: 'application/json',
	    url: '/epicFilter',
	    dataType : 'json',
	    data : JSON.stringify(data),
	    success: function(response){
			var filtered = response;
			applyFilter(filtered);
		},
		error: function(error){
			console.log(error);
		}
	});
});
 	
$(document).on("click",".type",function(){
	typeName = this.innerHTML;
	var data = {"type":typeName};
	$.ajax({
		type: 'POST',
	    contentType: 'application/json',
	    url: '/typeFilter',
	    dataType : 'json',
	    data : JSON.stringify(data),
	    success: function(response){
			var filtered = response;
			applyFilter(filtered);
		},
		error: function(error){
			console.log(error);
		}
	});
});