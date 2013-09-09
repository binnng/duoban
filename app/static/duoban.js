(function() {
	var isbn = $('.data .isbn').text().replace(/-/g, ''),
		$body = $('body'),
		id,
		rating,

		html = [
			'<div class="duoban-sec">',
				'<p class="logo">多瓣</p>',
				'<div class="cnt">',
					'<img src="{image}" />',
					'<ul class="info">',
					  	'<li class="title">{title}</li>',
					  	'<li class="author">{author}</li>',
					  	'<li class="pub">{publisher}</li>',
					  	'<li class="date">{pubdate}</li>',
					  	'<li class="book_rating small">',
					  		'<span class="star"><b style="width: {width}%"></b></span><u>{rating}分</u>',
					  	'</li>',
					'</ul>',
					'<div class="link">',
						'<a href="http://book.douban.com/subject/{id}/" target="_blank">豆瓣</a>',
						'<a href="http://book.douban.com/subject/{id}/reviews" target="_blank">豆瓣书评</a>',
						'<a href="http://book.douban.com/subject/{id}/annotation" target="_blank">豆瓣笔记</a>',
					'</div>',
					'<i class="close">关闭</i>',
				'</div>',
			'</div>'
		];

	if (!isbn) return false;

	$.getJSON('https://api.douban.com/v2/book/isbn/' + isbn, function(data) {
		id = data['id'];
		rating = data['rating']['average'];

		html = html.join('').replace(/\{id\}/g, id)
			.replace('{title}', data.title)
			.replace('{image}', data.image)
			.replace('{title}', data.title)
			.replace('{author}', data.author[0])
			.replace('{pubdate}', data.pubdate)
			.replace('{publisher}', data.publisher)
			.replace('{width}', rating * 10)
			.replace('{rating}', rating)

		$body.append(html);

		if (!data.pubdate) {
			$('.duoban-sec .date').remove();
		}
		if (!data.publisher) {
			$('.duoban-sec .pub').remove();
		}

		var $duobanSec = $('.duoban-sec'),
			$close = $('.duoban-sec .close'),
			$logo = $('.duoban-sec .logo'),
			$cnt = $('.duoban-sec .cnt'),

			w = $duobanSec.innerWidth() + 80,

			fnAni = {
				open: function() {
					$logo.removeClass('green');
					window.localStorage.setItem('duoban', '1');
					$duobanSec.animate({
					    left: "10px"
					}, 200);
				},
				hide: function() {
					$duobanSec.animate({
					    left: -w + "px"
					}, 200);
					$logo.addClass('green');
					window.localStorage.setItem('duoban', '0');
				}
			},

			store = window.localStorage.getItem('duoban') || 1;

		setTimeout(function() {
			0 == store ? fnAni.hide() : fnAni.open();
		}, 1000);

		$close.on('click', fnAni.hide);

		$logo.on('click', fnAni.open);
	});

})();