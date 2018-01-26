$(function(){
	$('#btnHome').click(function(){
		location.href="showHomePage";		
	});

	$('#btnNextFields1').click(function(){
		$('#primaryFields').hide();
		$('#secondaryFields').show()
		$('#ball2').css("background-color", "green");
		$('#btnNextFields1').hide();
		$('#btnNextFields2').show();
	});

	$('#btnNextFields2').click(function(){
		$('#secondaryFields').hide();
		$('#tertiaryFields').show();
		$('#ball3').css("background-color", "green");
		$('#btnNextFields2').hide();
		$('#btnAddTask').show();
	});

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

	$('#ball1').click(function(){
		$('#primaryFields').show();
		$('#secondaryFields').hide();
		$('#tertiaryFields').hide();
		$('#ball1').css("background-color", "grey");
		$('#ball2').css("background-color", "grey");
		$('#ball2').css("background-color", "grey");
		$('#btnNextFields1').show();
		$('#btnNextFields2').hide();
		$('#btnAddTask').hide();		
	});

	$('#ball2').click(function(){
		$('#primaryFields').hide();
		$('#secondaryFields').show();
		$('#tertiaryFields').hide();
		$('#ball1').css("background-color", "grey");
		$('#ball2').css("background-color", "grey");
		$('#ball2').css("background-color", "grey");
		$('#btnNextFields1').hide();
		$('#btnNextFields2').show();
		$('#btnAddTask').hide();		
	});

	$('#ball3').click(function(){
		$('#primaryFields').hide();
		$('#secondaryFields').hide();
		$('#tertiaryFields').show();
		$('#ball1').css("background-color", "grey");
		$('#ball2').css("background-color", "grey");
		$('#ball2').css("background-color", "grey");
		$('#btnNextFields1').hide();
		$('#btnNextFields2').hide();
		$('#btnAddTask').show();		
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