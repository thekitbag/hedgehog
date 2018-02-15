$(function(){
	$('#btnAddTask').click(function(){
		$.ajax({
			url: '/addTask',
			data: $('form').serialize(),
			type: 'POST',
			success: function(response){
				console.log(response);
			},
			error: function(error){
				console.log(error);
			}
		});

		location.href="showTasks"
	});
});