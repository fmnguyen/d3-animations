var n = 231,		 // number of wedges
	w = h = 600, // width and height
	row = col = 7,
	r = w / row

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
				return { x: d % row + 1, y: Math.floor(d / col) + 1 }
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


function update(a, b) {
	lissajous.attr('d', 'M' + range.map(function(p) {
		return [
			0.4 * w * _sin(a * p) + w / 2,
			0.4 * h * _sin(b * p) + h / 2
		]
	}).join("L"));
}

d3.timer(function(t){
	lissajous.attr('d', 'M' + range.map(function(p) {
		var a = _sin(t / 10000) / 2,
			b = _cos(t / 10000) / 2;
		return [
			0.4 * w * _sin(a * p * t / 10000 + _cos(t / 16000)) + w / 2,
			0.4 * h * _sin(b * p * t / 10000) + h / 2
		]
	}).join("L"));
});

// add a transition to each of the group objects to transform it's scale
// as a function of time
// lissajous.transition(t)
// 	.delay(function(d) {
// 		var x = row / 2 - d.x - 1,
// 			y = row / 2 - d.y + 4;
// 		console.log('x: ' + x)
// 		console.log('y: ' + y)

// 		return  Math.sqrt(x*x + y*y) * 175z;
// 	})
// 	.on('start', function repeat() {
// 		d3.active(this)
// 				.attrTween('transform', rotateFn(0))
// 			.transition(t)
// 			.delay(2000)
// 				.attrTween('transform', rotateFn(-π / 2))
// 			.transition(t)
// 				.delay(2000)
// 				.on('start', repeat) // after all this is done, we want to repeat this animation
// 	});