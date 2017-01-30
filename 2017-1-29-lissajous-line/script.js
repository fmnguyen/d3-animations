var w = h = 600, // width and height
	row = col = 10,
	r = w / row;

var time = 500,
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

var range = d3.range(0, 3 * π , 0.01);
//var lissajousEquation = { x: A * _sin(a * p + ƒ), y: B * _sin(b * p + ∂) }
var xScale = d3.scaleLinear().range([r, w - r]);
var yScale = d3.scaleLinear().range([h - r, r]);

var data = d3.range(0, row * col)
			.map(function(d) {
				var x = d % row + 1,
					y = Math.floor(d / col) + 1;
				return {
					x: x,
					y: y,
					datum: range.map(function(p) {
						return {
							x: 0.4 * r * _sin(x * p) + r / 2,
							y: 0.4 * r * _sin(y * p) + r / 2
						}
					})
				}
			});

// create our background svg parent
var svg = d3.select('.background').append('svg')
			.attr('width', w)
			.attr('height', h)
			.style('background-color', 'transparent')

var lineFunction = d3.line()
					.curve(d3.curveBasis)
					.x(function(d){ return d.x; })
					.y(function(d){ return d.y; });

var lissajous = svg.selectAll('path')
					.data(data)
				.enter()
				.append('path')
					.attr('transform', function(d) {
						console.log(d)
						return 'translate(' + [(d.x - 1) * r, (d.y - 1) * r] + ')'
					})
					.datum(function(d){ return d.datum })
					.attr('fill', 'none')
					.attr('stroke', 'black')
					.attr('stroke-width', 1)
					.attr('stroke-opacity', 0.8)
					.attr('d', lineFunction)