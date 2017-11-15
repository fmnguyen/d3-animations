/*
 * IMPORTANT:
 * For any animation that requires some type of rotation,
 * you almost always need to use an svg transform using rotate.
 * If you use rotate(degree, 0, 0) you will rotate the object about its own axis (center)
 * Using this pattern requires less calculation, and will then require you to use
 * d3.interval() instead of d3.timer()
 *
 */

var n = 15,		 // number of rows
	w = h = 600, // width and height
	r = h / 40,
	D = r * 2,
	col = w / D - 3,
	row = h / D - 3,
	padding = 15;

var π = Math.PI;

// just some nicer math functions
function cos(val) {
	return Math.cos(val);
}

function sin(val) {
	return Math.sin(val);
}

var data = d3.range(0, row * col)
			.map(function(d) {
				var a = d % row - 1
				var b = Math.floor(d / col) - 1
				var angle;

				if (a % 2 == 0) {
					if(b % 2 == 0)
						angle = 2 * π;
					else
						angle = 3 * π / 2;
				} else {
					if(b % 2 == 0)
						angle = π / 2;
					else
						angle = π;
				}

				return { a: a, b: b, angle: angle }
			});

var t = d3.transition()
	    	.duration(1000);
var v = d3.transition()
	    	.duration(1);

var svg = d3.select('body').append('svg')
			.attr('width', w)
			.attr('height', h)

var arc = d3.arc()
	.innerRadius(0)
	.outerRadius(r)
	.startAngle(function(d) {
		return d.angle;
	})
	.endAngle(function(d) {
		return d.angle + 3 * π / 2 // 3/4 of a circle for our pac-man like arcs
	});

var path = svg.selectAll('.arc')

path.data(data)
	.enter().append('path')
		.attr('class', 'arc')
		.attr('d', arc)
		.attr('data', function(d) {return d.angle * 180 / π})
		.attr('transform', function(d) {
			var evenRow = d.b % 2 === 0,
				//x0 = evenRow ? d.a * D + d.a * padding + 1.25 * r: d.a * D + d.a * padding,
				x0 = d.a * D + d.a * padding + D,
				y0 = d.b * D + d.b * padding + D;
			return 'translate(' + [x0, y0] + ')rotate(0)';
		})
		.transition(t)
		.on('start', function repeat() { // where we're repeating
			// while our current is active, we want to move scale the size
			// our rotation animation is being handled by our css animation
			d3.active(this)
				.transition(t)
					.attr('transform', function(d) {
						x0 = d.a * D + d.a * padding + D,
						y0 = d.b * D + d.b * padding + D;
						return 'translate(' + [x0, y0] + ')rotate(0, 0, 0)';
					})
				.transition(t)
					.attr('transform', function(d) {
						var evenRow = d.b % 2 === 0,
						x0 = evenRow ? d.a * D + d.a * padding + D: (d.a + 1) * D + (d.a + 1) * padding + D,
						y0 = d.b * D + d.b * padding + D;
						return 'translate(' + [x0, y0] + ')rotate(180, 0, 0)';
					})
				.transition(t)
					.delay(500)
					.attr('transform', function(d) {
						var evenRow = d.b % 2 === 0,
						x0 = evenRow ? d.a * D + d.a * padding + D: (d.a + 1) * D + (d.a + 1) * padding + D,
						y0 = d.b * D + d.b * padding + D;
						return 'translate(' + [x0, y0] + ')rotate(90, 0, 0)';
					})
				.transition(t)
					.delay(500)
					.attr('transform', function(d) {
						var evenRow = d.b % 2 === 0,
							x0, y0;

						// i'm sure there's a way easier / nicer way to doing this...

						if (d.angle == π) {
							x0 = evenRow ? (d.a + 1) * D + (d.a + 1) * padding : (d.a + 2) * D + (d.a + 2) * padding + D
							y0 = (d.b + 1) * D + (d.b + 1) * padding + D
						} else if(d.angle == π / 2) {
							x0 = evenRow ? (d.a - 1) * D + (d.a - 1) * padding + D : (d.a) * D + (d.a) * padding + D
							y0 = (d.b + 1) * D + (d.b + 1) * padding + D
						} else if(d.angle == 3 * π / 2) {
							x0 = evenRow ? (d.a - 1) * D + (d.a - 1) * padding + D : (d.a) * D + (d.a) * padding + D,
							y0 = (d.b - 1) * D + (d.b - 1) * padding + D
						} else if(d.angle == 2 * π) {
							x0 = evenRow ? (d.a + 1) * D + (d.a + 1) * padding + D : (d.a + 2) * D + (d.a + 2) * padding + D,
							y0 = (d.b - 1) * D + (d.b - 1) * padding + D
						}
						return 'translate(' + [x0, y0] + ')rotate(90, 0, 0)';
					})
				.transition(v)
					.attr('transform', function(d) {
						var evenRow = d.b % 2 === 0,
							x0, y0;

						if (d.angle == π) {
							x0 = evenRow ? (d.a + 1) * D + (d.a + 1) * padding : (d.a + 2) * D + (d.a + 2) * padding + D
							y0 = (d.b + 1) * D + (d.b + 1) * padding + D
						} else if(d.angle == π / 2) {
							x0 = evenRow ? (d.a - 1) * D + (d.a - 1) * padding + D : (d.a) * D + (d.a) * padding + D
							y0 = (d.b + 1) * D + (d.b + 1) * padding + D
						} else if(d.angle == 3 * π / 2) {
							x0 = evenRow ? (d.a - 1) * D + (d.a - 1) * padding + D : (d.a) * D + (d.a) * padding + D,
							y0 = (d.b - 1) * D + (d.b - 1) * padding + D
						} else if(d.angle == 2 * π) {
							x0 = evenRow ? (d.a + 1) * D + (d.a + 1) * padding + D : (d.a + 2) * D + (d.a + 2) * padding + D,
							y0 = (d.b - 1) * D + (d.b - 1) * padding + D
						}

						return 'translate(' + [x0, y0] + ')rotate(0, 0, 0)';
					})
				.transition(t)
					.delay(500)
					.attr('transform', function(d) {
						var evenRow = d.b % 2 === 0,
							x0, y0;

						if (d.angle == π) {
							x0 = evenRow ? (d.a + 1) * D + (d.a + 1) * padding : (d.a) * D + (d.a) * padding + D
							y0 = (d.b + 1) * D + (d.b + 1) * padding + D
						} else if(d.angle == π / 2) {
							x0 = evenRow ? (d.a + 1) * D + (d.a + 1) * padding + D : (d.a) * D + (d.a) * padding + D
							y0 = (d.b + 1) * D + (d.b + 1) * padding + D
						} else if(d.angle == 3 * π / 2) {
							x0 = evenRow ? (d.a + 1) * D + (d.a + 1) * padding + D : (d.a) * D + (d.a) * padding + D,
							y0 = (d.b - 1) * D + (d.b - 1) * padding + D
						} else if(d.angle == 2 * π) {
							x0 = evenRow ? (d.a + 1) * D + (d.a + 1) * padding + D : (d.a) * D + (d.a) * padding + D,
							y0 = (d.b - 1) * D + (d.b - 1) * padding + D
						}

						return 'translate(' + [x0, y0] + ')rotate(0, 0, 0)';
					})
				.transition(t)
					.delay(500)
					.attr('transform', function(d) {
						x0 = d.a * D + d.a * padding + D,
						y0 = d.b * D + d.b * padding + D;
						return 'translate(' + [x0, y0] + ')rotate(180, 0, 0)';
					})
				.transition(v)
					.on('start', repeat) // after all this is done, we want to repeat this animation
		});

// d3.timer(function(t) {
// 	path.attr('transform', function(d) {
// 		var start_θ = π / 2;
// 		var evenRow = d.y % 2 === 0;

// 		var  θ = start_θ + (t / 2000) * π / 2, 	// angle = time (between 0 and 1) * π / 2 (we want to rotate our shape by π / 2 rotations)
// 			 ƒ = 90 * _sin(θ),
// 			x0 = D * d.x,										// starting is radius times el, plus the diameter
// 			y0 = evenRow ? D * d.y / 2	 : 	 D * (d.y - 1) / 2;	// y0 = radius in height, plus r times the data / rows

// 		if(evenRow)
// 			return 'rotate(' + [ƒ, x0 + r, y0] + ')';
// 		else
// 			return 'rotate(' + [ƒ, x0, y0 + r] + ')';
// 	});
// })