function populateList(endpoint, container) {
	$.get(endpoint, function(data) {
		var results = data;
  		var resultsLength = results.length
 		for (var i = 0; i < resultsLength; i++) {
 			if (container == "epicContainer") {
 				document.getElementById(results[i]).appendChild(container);
 			} else if (container == "typeContainer") {
 				document.getElementById(results[i]).appendChild(container); 				
 			} else console.log("Container does not exist");			
 		}
 	});
 }

 populateList("/getEpics", "epicContainer");
 populateList("/getTypes", "typeContainer");
