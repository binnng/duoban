(function(win) {
	var isbn = $('.data .isbn').text().replace(/-/g, ''),
		$com = $('.j-comment'),
		$cnt = $('.m-bookdata .cnt'),
		id,
		rating,

		html = [
			'<div class="duoban-sec">',
			'<div class="w-tab">',
			'<div class="tab">',
			'<ul><li class="itm crt"><a href="javascript:void(0)" class="crt">多瓣</a></li></ul>',
			'<div class="arr arr1 j-target" style="left: 22.5px;"></div>',
			'</div>',
			'<div class="cnt">',
			'<a href="http://book.douban.com/subject/{id}/" target="_blank">去豆瓣</a>',
			'<a href="http://book.douban.com/subject/{id}/reviews" target="_blank">看豆瓣书评</a>',
			'<a href="http://book.douban.com/subject/{id}/annotation" target="_blank">看豆瓣笔记</a>',
			'</div>',
			'</div>',
			'</div>'
		],

		r_html = [
			'<div class="w-starfive"><ul class="five">',
			'{stars}',
			'</ul><em itemprop="ratingValue">{rating}</em>',
			'<span class="num">( 来自多瓣 )</span></div>'
		];

	$.getJSON('https://api.douban.com/v2/book/isbn/' + isbn, function(data) {
		id = data['id'];
		rating = data['rating']['average'];

		$(html.join('').replace(/\{id\}/g, id)).insertBefore($com);

		$( r_html.join('').replace('{stars}', (function(i) {
			var _html = '', j = 5 - i;
			while (i --) {
				_html += '<li class="red j-png"></li>';
			}
			while (j --) {
				_html += '<li class="j-png"></li>';
			}
			return _html;
		})(Math.ceil(rating / 2))).replace('{rating}', rating) ).insertBefore($cnt);
		$('.m-bookdata .data').height(82);
	});

})(window);