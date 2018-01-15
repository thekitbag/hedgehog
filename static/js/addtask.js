$(function(){
	$('#btnNextFields1').click(function(){
		$('#primaryFields').hide(100);
		$('#secondaryFields').show(100);
		$('#ball2').css("background-color", "green");
		$('#btnNextFields1').hide();
		$('#btnNextFields2').show();
	});

	$('#btnNextFields2').click(function(){
		$('#secondaryFields').hide(100);
		$('#tertiaryFields').show(100);
		$('#ball3').css("background-color", "green");
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