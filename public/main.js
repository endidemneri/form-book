$('document').ready(function() {
	
	$('#submit').on('click', function() {
		$.ajax({
			url: '/submit',
			type: 'POST',
			datatype: 'json',
			data: {
				title: $('#title').val(),
				author: $('#author').val()
			},
			success: function(data) {
				console.log('Submitted');
				$('#submit_result').html('Book submitted');
			}
		});
	});
	
	$('#search_book').on('click', function() {
		$.ajax({
			url: '/search',
			type: 'POST',
			datatype: 'json',
			data: {
				title: $('#book_title').val()
			},
			success: function(data) {
				console.log('Submitted');
				$('#result').html('Book title: ' + data.title + '<br>' + 'Book author: ' + data.author);
			}
		});
	});
	
	$('#search_author').on('click', function() {
		$.ajax({
			url: '/author',
			type: 'POST',
			datatype: 'json',
			data: {
				author: $('#book_author').val()
			},
			success: function(data) {
				console.log('Submitted');
				$('#result').html('Book title: ' + data.title + '<br>' + 'Book author: ' + data.author);
			}
		});
	});
});