/*
 * IMPORTANT:
 * For any animation that requires some type of rotation,
 * you almost always need to use an svg transform using rotate.
 * If you use rotate(degree, 0, 0) you will rotate the object about its own axis (center)
 * Using this pattern requires less calculation, and will then require you to use
 * d3.interval() instead of d3.timer()
 *
 */

var n = 8,		 // number of rows
	w = h = 600, // width and height
	r = h / n,
	D = r * 2,
	col = 2,
	row = 2,
	padding = 10;

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
				var a = d % row
				var b = Math.floor(d / col)
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
			console.log(data)

var data2 = d3.range(0, 4)
			.map(function(d) {
				var a = d % row
				var b = Math.floor(d / col)
				return { a: a, b: b }
			})
			console.log(data2)

var t = d3.transition()
	    	.duration(1000);

var v = d3.transition()
	    	.duration(1);

var g = d3.select('body').append('svg')
			.attr('width', w)
			.attr('height', h)
			.append('g')
			.attr('transform', 'translate(' + [w/4, h/4] + ')')

var arc = d3.arc()
	.innerRadius(0)
	.outerRadius(r)
	.startAngle(function(d) {
		return d.angle;
	})
	.endAngle(function(d) {
		return d.angle + 3 * π / 2 // 3/4 of a circle for our pac-man like arcs
	});

var circles = g.selectAll('circle')

circles.data(data)
	.enter().append('circle')
		.attr('class', 'circle')
		.attr('r', r)
		.attr('cx', function(d) { return d.a * D + padding * d.a + r })
		.attr('cy', function(d) { return d.b * D + padding * d.b + r })
		.attr('data', function(d) { return d.angle * 180 / π })
		.attr('fill', 'black')

var squares = g.selectAll('rect')
	.data(data2)
	.enter().append('rect')
		.attr('class', 'square')
		.attr('height', r + padding / 2)
		.attr('width', r + padding / 2)
		.attr('x', function(d) { return d.a * r + r })
		.attr('y', function(d) { return d.b * r + r })
		.attr('fill', 'white')
		.attr('data', function(d) { return [d.a, d.b] })
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