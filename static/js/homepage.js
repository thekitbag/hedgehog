$(function(){
	$('#skip-button').click(function(){
		location.href="showHomePage";		
	});

	$('#btn-add-task').click(function(){
		location.href="showAddTask";		
	});

	$('#view-tasks-button').click(function(){
		location.href="showTasks";		
	});

	$('#view-stats-button').click(function(){
		location.href="showStats";		
	});		
});

$(function(){
	$('#btnLogIn').click(function(){
		$.ajax({
			url: '/logIn',
			data: $('form').serialize(),
			type: 'POST',
			success: function(response){
				if (response === "Log in successful") {
					location.href="showHomePage";
				} else {
					alert("Username or Password Incorrect")
				}
			},
			error: function(error){
				console.log(error);
			}
		});
	});
});

$(function(){
	$('#btnSignUp').click(function(){
		$.ajax({
			url: '/createUser',
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