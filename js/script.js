/* Twitter button */ ! function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0],
		p = /^http:/.test(d.location) ? 'http' : 'https';
	if (!d.getElementById(id)) {
		js = d.createElement(s);
		js.id = id;
		js.src = p + '://platform.twitter.com/widgets.js';
		fjs.parentNode.insertBefore(js, fjs);
	}
}(document, 'script', 'twitter-wjs');

$(document).ready(function () {
	var html = '<div id="botao-twitter" class="right"></div>';
	$("#twitter-content").html(html);
	
	$.getJSON("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1", function (json) {
		var post = json.shift(); // The data is an array of posts. Grab the first one.
		var quote = '"' + post.content.slice(3, -5) + '"'; // retira a tag <p> e </p>
		var author = " - By " + post.title;
		$('#quote-content').html(quote);
		$('#quote-author').html(author);
		twttr.widgets.createShareButton(
				'http://codepen.io/davinasc/debug/MyObBX',
				document.getElementById('botao-twitter'), {
					text: quote
				}
			);
	});
});

/* Pega vários post usando api, e imprime na tela */
newQuote = function() {
	$.ajax({
		url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
		success: function(data) {
			var post = data.shift(); // The data is an array of posts. Grab the first one.
			var quote = '"' + post.content.slice(3, -5) + '"'; // retira a tag <p> e </p>
			var author = " - By " + post.title;
			$('#quote-content').html(quote);
			$('#quote-author').html(author);
			
			if(!document.getElementById('botao-twitter').hasChildNodes()) {
				twttr.widgets.createShareButton(
					'http://codepen.io/davinasc/debug/MyObBX',
					document.getElementById('botao-twitter'), {
						text: quote
					}
				);
			} else {
				updateBotaoTwitter(quote);
			}			
		},
		cache: false
	});
};

var updateBotaoTwitter = function(quote) {
	$("#botao-twitter iframe").remove();
	var botaoTwitter = $('<a></a>')
		.addClass('twitter-share-button')
		.attr('href', 'http://twitter.com/share')
		.attr('data-url', 'http://codepen.io/davinasc/debug/MyObBX')
		.attr('data-text', quote);
	$('#botao-twitter').append(botaoTwitter);
	twttr.widgets.load();
}

refresh = function() {
	var quote = getElementById("quote-content").val();
	getElementById("tweet").setAttribute('data-text', quote);
	twttr.widgets.load();
};