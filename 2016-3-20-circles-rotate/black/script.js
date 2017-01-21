var circleCount = 10;
var drawRadius = 100;
var initRadius = 10;
var speed = 1.5
var currentCircles = [];

var svgHeight = 600;
var svgWidth = 600;

var svg = d3.select('body').append('svg')
			.attr({
				'width': svgHeight,
				'height': svgWidth,
			})
			.append('g');


for (var i = 1; i <= circleCount; i++) {
	var t_circle = d3.map();
		t_circle.set('id', i);
		t_circle.set('cr', initRadius);
		t_circle.set('angle', 2 * Math.PI / circleCount * i);
		t_circle.set('x', svgWidth / 2 + drawRadius * Math.cos(2 * Math.PI + (2 * Math.PI * i / circleCount)));
		t_circle.set('y', svgHeight / 2 + drawRadius * Math.sin(2 * Math.PI + (2 * Math.PI * i / circleCount)));
		t_circle.set('scale', 1);
		currentCircles.push(t_circle);
}

var timeparam = 1500 * speed;

var circle = svg.selectAll("circle")
    .data(currentCircles, function(d){ return d.get('id') })
  .enter()
  .append("circle")
    .attr('r', function(d){ return d.get('cr') })
    .attr('cx', function(d){ return d.get('x') })
    .attr('cy', function(d){ return d.get('y') })
    .attr('fill', function(i) { return i.get('id') % 2 ? 'white' : 'black' })
	.each(pulse);

function pulse() {
	(function repeat() {
		d3.selectAll('circle').transition()
		.duration(timeparam)
		.ease('sine')
		.attrTween('transform', translateFn())
		.each("end", repeat);
	})();
}

function translateFn() {
	return function(d) {
		return function(t) {
			var t_x, t_y;
			var t_angle = (2 * Math.PI) * t;
			var t_x = drawRadius * Math.cos(t_angle + d.get('angle'));
			var t_y = drawRadius * Math.sin(t_angle + d.get('angle'));

			return "translate(" + [t_x, t_y] + ")";
		};
	};
}

function size() {
	return function (d) {
		return function(t) {
			return d.get('cr') * t * speed;
		}
	}
}