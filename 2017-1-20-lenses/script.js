var n = 231,		 // number of wedges
	w = h = 600, // width and height
	r = h / 20,	 // 50
	D = r * 2,	 // 100
	col = w / D + 1, // 7
	row = h / D + 1; // 7

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

var data = d3.range(0, n)
			.map(function(d){
				return { x: (d + 1) % row, y: Math.floor(d / col) }
			});

// create our background svg parent
var svg = d3.select('.background').append('svg')
			.attr('width', w)
			.attr('height', h)
			.style('background-color', 'transparent')

var lenses = svg.selectAll('path')
				.data(data)
			.enter()
			.append('path')
				.attr('stroke', 'black')
				.attr('stroke-width', 1)
				.attr('fill', 'black')
				.attr('d', function(d, i) {
					var evenRow = d.y % 2 === 0;
					var x0 = D * d.x,																	// starting is radius times el, plus the diameter
						y0 = evenRow ? D * d.y / 2 : 	 D * (d.y - 1) / 2,	// y0 = radius in height, plus r times the data / rows
						x1 = evenRow ? D + D * d.x : 	 D * d.x, 					// x1 = starting point plus diameter
						y1 = evenRow ? D * d.y / 2 : D + D * (d.y - 1) / 2, // y1 needs to stay the same as y0
						cx = evenRow ? 	   r / 1.5 : r / 2, 								// arbitrary to get the look we want
						cy = evenRow ? 	   r / 2.0 : r / 1.5;									// arbitrary to get the look we want

					if (evenRow) {
						return 	"M" + [x0, y0] +
								"C" + [x0 + cx, y0 - cy, x1 - cx, y1 - cy, x1, y1] +
								"M" + [x0, y0] +
								"C" + [x0 + cx, y0 + cy, x1 - cx, y1 + cy, x1, y1] +
								"Z";
					} else {
						return 	"M" + [x0, y0] +
								"C" + [x0 - cx, y0 + cy, x1 - cx, y1 - cy, x1, y1] +
								"M" + [x0, y0] +
								"C" + [x0 + cx, y0 + cy, x1 + cx, y1 - cy, x1, y1] +
								"Z";
					}
				})

// add a transition to each of the group objects to transform it's scale
// as a function of time
lenses.transition(t)
	.delay(function(d) {
		var x = row / 2 - d.x - 0.5,
			y = row / 2 - d.y + 5;

		return  Math.sqrt(x*x + y*y) * 150;
	})
	.on('start', function repeat() { // where we're repeating
		// while our current is active, we want to move scale the size
		// our rotation animation is being handled by our css animation
		d3.active(this)
				//.attrTween('opacity', opacityFn())
				.attrTween('transform', rotateFn(0))
			.transition(t)
			.delay(2000)
				.attrTween('transform', rotateFn(-π / 2))
			.transition(t)
				.delay(2000)
				.on('start', repeat) // after all this is done, we want to repeat this animation
	});

function rotateFn(start_θ) {
	return function(d) {
		return function(t) {
			var evenRow = d.y % 2 === 0;

			var  θ = start_θ + t * π / 2, // angle = time (between 0 and 1) * π / 2 (we want to rotate our shape by π / 2 rotations)
				 ƒ = 90 * _sin(θ),
				x0 = D * d.x,																	// starting is radius times el, plus the diameter
				y0 = evenRow ? D * d.y / 2	 : 	 D * (d.y - 1) / 2;	// y0 = radius in height, plus r times the data / rows

			if(evenRow)
				return 'rotate(' + [ƒ, x0 + r, y0] + ')';
			else
				return 'rotate(' + [ƒ, x0, y0 + r] + ')';
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