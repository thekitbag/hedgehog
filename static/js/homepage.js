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