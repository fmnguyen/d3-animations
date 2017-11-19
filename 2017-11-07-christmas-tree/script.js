var n = 15,		 // number of rows
	w = h = 600, // width and height
	r = h / 50,
	D = r * 2,
	col = w / D + 1,
	row = h / D + 1;

var time = 500,
	speed = 2;

var π = Math.PI;

// just some nicer math functions
function cos(val) {
	return Math.cos(val);
}

function sin(val) {
	return Math.sin(val);
}

var svg = d3.select('body').append('svg')
			.attr('width', w)
			.attr('height', h)

var data = d3.range(0, n)
			.map(function(n) {
				return d3.range(0, n + 3) // need n + 3 so we have 2 extra circles to be able to iterate through
					.map(function(d) {
						return { n: d + 1 }
					})
			})

var g = svg.selectAll('g')
	.data(data)
	.enter()
	.append('g')
	.attr('transform', function(d, i) {
		return 'translate(' + (w / 2 - (i+1) * r - 2 * i - r) + ',' + ((D + 8) * i + 70) + ')'
	}) // some translating for each of the grouped elements. Just half the width minus i*r many circles, then manual scaling for vertical axis

function update(data) {

	var t = d3.transition()
	    	.duration(1250);

	var row_group = g.selectAll('circle')

	row_group.data(function(d, i) {
			return d.map(function(m) {
				if (d.length % 2 == 0) // for every second row, we want to start at 0 instead of 1
					return { n: m.n - 1, row: i + 1 };
				return { n: m.n, row: i + 1 };
			});
		})
		.enter().append('circle')
		.attr('r', 0) // when first appending our circles, start at r = 0
		.attr('cx', function(d, i) {
			if (d.row % 2 == 0) {
				return D * d.n / 2 + d.n * r + 4 * d.n - r;
			} else {
				return D * d.n / 2 + d.n * r + 4 * d.n + r;
			}
		})
		.attr('fill', function(d) { return d.row % 2 == 0 ? 'red' : 'green'})
		.merge(row_group) // merge / update in our general d3 update pattern
		.transition(t)
			.delay(function(d, i) {
				return d.row * 20; // look @ jeef heer's paper on animation perception for ideal delay
			})
			.attr('cx', function(d, i) {
				return D * d.n / 2 + d.n * r + 4 * d.n;
			})
			.attr('r', function(d, i) {
				if(d.n > d.row || d.n == 0) // if first or last, make our circle disappear
					return 0
				else
					return r
			})
}

update(data); // initialize our chart

d3.interval(function() {
	data.forEach(function(d) {
		d.forEach(function(m) {
			if (d.length % 2 == 1) {
				if (m.n - 1 == -1)
					m.n = d.length - 1;
				else
					m.n = m.n - 1;
			} else {
				if (m.n == d.length)
					m.n = 1;
				else
					m.n = m.n + 1;
			}
		})
	})
	update(data)
}, 1750);
