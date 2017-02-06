var n = 231,		 // number of wedges
	w = h = 600, // width and height
	row = col = 7,
	r = w / row
	a = 5,
	b = 5;

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

var range = d3.range(0, 3 * π, 0.01)

var data = d3.range(0, row * col)
			.map(function(d){
				return { a: d % row + 1, b: Math.floor(d / col) + 1 }
			});

// create our background svg parent
var svg = d3.select('.background').append('svg')
			.attr('width', w)
			.attr('height', h)
			.style('background-color', 'transparent')

var lissajous = svg.append('path')
					.attr('fill', 'none')
					.attr('stroke', 'black')
					.attr('stroke-width', 1)
					.attr('stroke-opacity', 0.8)
					.attr('d', function(d) {
						return 'M' + range.map(function(p) {
							return [
								0.4 * w * _sin(a * p) + w / 2,
								0.4 * h * _sin(b * p) + h / 2
							]
						}).join("L")
					});

d3.timer(function(t){
	lissajous.attr('d', function(d) {
		return 'M' + range.map(function(p) {
			return [
				0.4 * w * _sin(a * p + _cos(t / 1600)) + w / 2,
				0.4 * h * _sin(b * p) + h / 2
			]
		}).join("L")
	});
});

function updatea() {
	var input = document.getElementById('a'),
		val = input.value;
	a = val;
	document.querySelector('#aoutput').value = val;
}

function updateb() {
	var input = document.getElementById('b'),
		val = input.value;
	b = val;
	document.querySelector('#boutput').value = val;
}