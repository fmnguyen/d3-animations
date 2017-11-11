// using d3.v4.min.js

var n = 15,		 // number of rows
	m = 15,
	w = h = 600, // width and height
	r = h / 50,
	D = r * 2,	 // 100
	col = w / D + 1, // 7
	row = h / D + 1; // 7

var time = 500, //2000,
	speed = 2;

var π = Math.PI;

// just some nicer math functions
function cos(val) {
	return Math.cos(val);
}

function sin(val) {
	return Math.sin(val);
}

var svgHeight = 600;
var svgWidth = 600;

var svg = d3.select('body').append('svg')
			.attr('width', svgHeight)
			.attr('height', svgWidth)

var data = d3.range(0, n)
			.map(function(n) {
				return d3.range(0, n + 3)
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
	})

function update(data) {

	var t = d3.transition()
	    	.duration(750);

	var row_group = g.selectAll('circle')

	row_group.data(function(d, i) {
			return d.map(function(m) {
				if (d.length % 2 == 0)
					return { n: m.n - 1, row: i + 1 };
				return { n: m.n, row: i + 1 };
			});
		})
		.enter().append('circle')
		.attr('r', 0)
		.attr('cx', function(d, i) {
			if (d.row % 2 == 0) {
				if (d.n > d.row)
					return D * d.row / 2 + d.row * r + 4 * d.row - r;
				return D * d.n / 2 + d.n * r + 4 * d.n - r;
			} else {
				if (d.n == 0)
					return D * 1 / 2 + 1 * r + 4 * 1 + r;
				return D * d.n / 2 + d.n * r + 4 * d.n + r;
			}
		})
		.attr('fill', function(d) { return d.row % 2 == 0 ? 'red' : 'green'})
		.merge(row_group)
		.transition(t)
			.delay(function(d, i) {
				console.log(d)
				if (d.row % 2 == 0)
					return 100 + d.row * 5;
				return d.row * 5;
			})
			.attr('cx', function(d, i) {
				return D * d.n / 2 + d.n * r + 4 * d.n;
			})
			.attr('r', function(d, i) {
				if(d.n > d.row || d.n == 0)
					return 0
				else
					return r
			})
}

update(data);

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
}, 3000);
