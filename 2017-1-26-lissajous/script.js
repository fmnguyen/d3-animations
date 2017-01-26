var n = 231,		 // number of wedges
	w = h = 600, // width and height
	row = col = 7,
	r = w / row;

var time = 500, //2000,
	speed = 2;

var t = d3.transition()
			.duration(time * speed)
			.ease(d3.easeSinInOut)

// just some nicer math functions
var π = Math.PI;
function _cos(val) {
	return Math.cos(val);
}
function _sin(val) {
	return Math.sin(val);
}

var range = d3.range(0, 3 * π, 0.05)

var data = d3.range(0, row * col)
			.map(function(d){
				return { x: d % row + 1, y: Math.floor(d / col) + 1 }
			});

// create our background svg parent
var svg = d3.select('.background').append('svg')
			.attr('width', w)
			.attr('height', h)
			.style('background-color', 'transparent')

var lissajous = svg.selectAll('path')
					.data(data)
				.enter()
				.append('path')
				.attr('transform', function(d){
					return 'translate(' + [(d.x - 1) * r, (d.y - 1) * r] + ')'
				})
				.attr('fill', 'none')
				.attr('stroke', 'black')
				.attr('stroke-width', 1)
				.attr('stroke-opacity', 0.8)
				.attr('d', function(d){
					return ('M' + range.map(function(p) {
						var a = _sin(d.x)

						return [
							0.4 * r * _sin(d.x * p) + r / 2,
							0.4 * r * _sin(d.y * p) + r / 2
						]
					}).join("L"))
				});