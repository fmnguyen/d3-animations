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
	r = h / 50,
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

function update() {
	var t = d3.transition()
			.ease(d3.easeLinear)
	    	.duration(2500);
	var v = d3.transition()
			.ease(d3.easeLinear)
	    	.duration(1);

	var path = svg.selectAll('.arc')

	path.data(data)
		.enter().append('path')
			.attr('class', 'arc')
			.attr('d', arc)
			.attr('transform', function(d) {
				return 'translate(' + (d.a * D + d.a * padding) + ',' + (d.b * D + d.b * padding) + ')rotate(0)';
			})
		.merge(path)
		.transition(t)
			.attr('transform', function(d) {
				return 'translate(' + (d.a * D + d.a * padding) + ',' + (d.b * D + d.b * padding) + ')rotate(360, 0, 0)';
			})
		.transition(t)
			.attr('transform', function(d) {
				return 'translate(' + (d.a * D + d.a * padding) + ',' + (d.b * D + d.b * padding) + ')rotate(180, 0, 0)';
			})
		.transition(t)
			.delay(30)
			.attr('transform', function(d) {
				return 'translate(' + (d.a * D + d.a * padding) + ',' + (d.b * D + d.b * padding) + ')rotate(359, 0, 0)';
			})
}

update()

d3.interval(function() {
	update();
}, 5030)

// Potential timer function that's more reliant on time
// d3.timer(function(t) {
// 	path.attr('transform', function(d) {
// 		var deg = d.angle * 180 / π;
// 		console.log(deg)

// 		var θ = (t / 50) 	// angle = time (between 0 and 1) * π / 2 (we want to rotate our shape by π / 2 rotations)

// 		return 'translate(' + (d.a * D) + ',' + (d.b * D) + ')rotate(' + [θ, 0, 0] + ')';
// 	});
// })

