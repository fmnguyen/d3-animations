// inspired by http://jfire.io/animations/2014-12-23/
// though not as effective... need to look @ keeping thigns in the middle constant?
//
var n = 40,		 // number of wedges
	w = h = 600, // width and height
	r = h / 2 * Math.sqrt(w / 2)//100

var time = 2000,
	speed = 2;

var t = d3.transition()
			.duration(time * speed)
			.ease(d3.easeLinear)

// just some nicer math functions
var π = Math.PI;
function _cos(val) {
	return Math.cos(val);
}
function _sin(val) {
	return Math.sin(val);
}

// create our background svg parent
var svg = d3.select('.background').append('svg')
			.attr('width', w)
			.attr('height', h)
			.style('background-color', 'transparent')

var wedges = svg.selectAll('path')
				.data(d3.range(0, 2 * π, 2 * π / n))
			.enter()
			.append('path')
				.attr('fill', 'white')
				.attr('d', function(d) {
					var x0 = r * _cos(d),
						y0 = r * _sin(d),
						x1 = r * _cos(d + (π / n)), // x1 = original point + π / n rotation
						y1 = r * _sin(d + (π / n)); // y1 = original point + π / n rotation

					return 	"M" + [w/2,  h/2] +
							"L" + [w/2 + x0	, h/2 + y0] + // start at our original point
							"M" + [w/2		, h/2] +
							"L" + [w/2 + x1	, h/2 + y1] + // then draw our second line
							"A" + [r, r, 0, 0, 1, w/2 + x1, h/2 + y1] + // and connect our two lines
							"Z";
				})

// add a transition to each of the group objects to transform it's scale
// as a function of time
wedges.transition(t)
	.delay(100)
	.on('start', function repeat() { // where we're repeating
		// while our current is active, we want to move scale the size
		// our rotation animation is being handled by our css animation
		d3.active(this)
				.attrTween('opacity', opacityFn())
				.attrTween('d', rotateFn())
			.transition(t)
				.on('start', repeat) // after all this is done, we want to repeat this animation
	});

function rotateFn() {
	return function(d) {
		return function(t) {
			var  θ = d + t * 2 * π / n, // angle =  original θ + time (between 0 and 1) * 2π/n (we want to rotate our shape two π/n rotations)
				x0 = r * (_cos(θ + (2 * t * π / n)) + 0.1), // decreases the size of each wedge as a factor of time
				y0 = r * (_sin(θ + (2 * t * π / n)) + 0.1),
				x1 = r * (_cos(θ + (2 * π / n)) + 0.1),
				y1 = r * (_sin(θ + (2 * π / n)) + 0.1);

				return 	"M" + [w/2, h/2] +
						"L" + [w/2 + x1	, h/2 + y1] + // draw our ending line first
						"M" + [w/2, h/2] +
						"L" + [w/2 + x0 , h/2 + y0] + // then draw our secondary line to see where to get to
						"A" + [r, r, 0, 0, 1, w/2 + x1, h/2 + y1] +
						"Z";

		}
	}
}

function opacityFn() {
	return function(d) {
		return function(t) {
			return 0.2 + Math.abs(_sin(t * π));
		}
	}
}