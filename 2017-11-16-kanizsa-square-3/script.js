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
	col = w / D - 1,
	row = h / D - 1,
	padding = 0;

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
				var a = d % row + 1
				var b = Math.floor(d / col) + 1
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

var data2 = d3.range(0, h / D * (col + 1) / 2, 2)
			.map(function(d) {
				var a = d % (h / D) + 1
				var b = Math.floor(d / (h / D)) * 2 + 1
				return { a: a, b: b }
			})

console.log(data2)

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

var circles = svg.selectAll('circle')

circles.data(data)
	.enter().append('circle')
		.attr('class', 'circle')
		.attr('r', r)
		.attr('cx', function(d) { return d.a * D })
		.attr('cy', function(d) { return d.b * D })
		.attr('data', function(d) { return d.angle * 180 / π })
		.attr('fill', 'black')

var squares = svg.selectAll('rect')
	.data(data2)
	.enter().append('rect')
		.attr('class', 'square')
		.attr('height', D)
		.attr('width', D)
		.attr('x', function(d) { return d.a * D })
		.attr('y', function(d) { return d.b * D })
		.attr('fill', '#d3d3d3')
		.attr('data', function(d) { return [d.a, d.b] })
	.transition(t)
		.attr('x', function(d) { return (d.a - 1) * D })
		.attr('y', function(d) { return (d.b - 1) * D })
		.attr('transform', function(d) { console.log(d); return 'translate(0,0)rotate(90)' })
	//.transition(t)
		// .on('start', function repeat() {
		// 	d3.active(this)
		// 	.transition(t)
		// 		.attr('x', function(d) { return (d.a - 1) * D })
		// 		.attr('y', function(d) { return (d.b - 1) * D })
		// 		.attr('transform', function(d) { console.log(d); return 'rotate(90,' + [d.a * r, r] + ')' })
		// 	// .transition(t)
		// 	// 	.attr('x', function(d) { return (d.a) * D })
		// 	// 	.attr('transform', function(d) { return 'translate(' + [0, 0] + 'rotate(0,' + [0, 0] + ')' })
		// 	// .transition(t)
		// 	// 	.attr('x', function(d) { return (d.a + 1) * D })
		// 	// 	.attr('y', function(d) { return (d.b) * D })
		// 	// 	.attr('transform', 'rotate(90, 0, 0)')
		// 	// .transition(t)
		// 	// 	.attr('x', function(d) { return (d.a) * D })
		// 	// 	.attr('y', function(d) { return (d.b) * D })
		// 	// .transition(t)
		// 		.on('start', repeat)
		// })



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