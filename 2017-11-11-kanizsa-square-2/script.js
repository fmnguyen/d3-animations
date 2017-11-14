var n = 15,		 // number of rows
	w = h = 600, // width and height
	r = h / 50,
	D = r * 2,
	col = 16,
	row = 16;

var time = 500,
	speed = 2;

var π = Math.PI;

// just some nicer math functions
function cos(val) {
	return Math.cos(val);
}

function sin(val) {
	return Math.sin(val);
}

var data = d3.range(0, row * col)
			.map(function(d){
				return { a: d % row + 1, b: Math.floor(d / col) + 1 }
			});

var svg = d3.select('body').append('svg')
			.attr('width', w)
			.attr('height', h)

var arc = d3.arc()
	.innerRadius(0)
	.outerRadius(r)
	.startAngle(0)
	.endAngle(3 * π / 2);

var path = svg.selectAll('.arc')
			.data(data)
			.enter().append('path')
				.attr('class', 'arc')
				.attr('d', arc)
				.attr("transform", function(d, i) {
					if (d.a % 2 == 0) {
						if(d.b % 2 == 0)
							return "translate(" + (d.a * D + d.a * 10) + "," + (d.b * D + d.b * 10) + ")rotate(" + 0 + ")" // 2 and 2
						else
							return "translate(" + (d.a * D + d.a * 10) + "," + (d.b * D + d.b * 10) + ")rotate(" + 270 + ")" // 2 and 1
					} else {
						if(d.b % 2 == 0)
							return "translate(" + (d.a * D + d.a * 10) + "," + (d.b * D + d.b * 10) + ")rotate(" + 90 + ")" // 1 and 2
						else
							return "translate(" + (d.a * D + d.a * 10) + "," + (d.b * D + d.b * 10) + ")rotate(" + 180 + ")" // 1 and 1
					}
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