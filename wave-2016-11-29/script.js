// using d3.v4.min.js
var circleCount = 30;
var col = 65;
var initRadius = 3;
var colWidth = 10;
var circleHeight = 7;

var period = 1;
var timeparam = 1500;
var speed = 2;

var π = Math.PI;
var currentCircles = [];
var color = d3.scaleOrdinal(d3.schemeCategory20);

var t = d3.transition()
			.duration(timeparam * speed)
			.ease(d3.easeLinear)

var s = d3.transition()
			.duration(timeparam * speed)
			.ease(d3.easeQuadInOut)

// just some nicer math functions
function _cos(val) {
	return Math.cos(val);
}

function _sin(val) {
	return Math.sin(val);
}

var svgHeight = 600;
var svgWidth = 600;

var svg = d3.select('.background').append('svg')
			.attr('width', svgHeight)
			.attr('height', svgWidth)
			.style('background-color', 'transparent')
			.style('position', 'absolute')

var g = svg.selectAll('g')
			.data(d3.range(0, col, 1))
		.enter()
		.append('g')
			.attr('transform', function(d) {
				return 'translate(' + d * colWidth + ', 0)scale(0)'
			});

for (var i = 1; i <= circleCount; i++) {
	var t_circle = d3.map();
		t_circle.set('id', i);
		t_circle.set('cr', initRadius);
		t_circle.set('x', svgWidth / 2);
		t_circle.set('y', svgHeight / 4 + (i * initRadius * 2) + (i * circleHeight));
		currentCircles.push(t_circle);
}

var circle = g.selectAll("circle")
    .data(currentCircles, function(d){ return d.get('id') })
  .enter()
  .append("circle")
    .attr('r', function(d){ return d.get('cr') })
    //.attr('cx', function(d){ return d.get('x') })
    .attr('cy', function(d){ return d.get('y') })
    .attr('fill', function(d) { return '#C3423B'; })
    // .transition(t)
    // .delay(function(d){ return d.get('id') * (timeparam * speed / circleCount); })
    // .on('start', function repeat() { // where we're repeating
    // // 	// while our current is active, we want to move scale the size
    // // 	// our rotation animation is being handled by our css animation
    // 	d3.active(this)
    // 			.attrTween('r', sizeFn())
    // 			.attrTween('opacity', opacityFn())
    // 		.transition(t)
    // 			.on('start', repeat) // after all this is done, we want to repeat this animation
    // });

g.transition(t)
	.delay(function(d){ return d * (timeparam * speed / col); })
	.on('start', function repeat() { // where we're repeating
		// while our current is active, we want to move scale the size
		// our rotation animation is being handled by our css animation
		d3.active(this)
				.attrTween('transform', scaleFn())
				.attrTween('opacity', opacityFn())
			.transition(t)
				.on('start', repeat) // after all this is done, we want to repeat this animation
	});

function scaleFn() {
	return function(d) {
		return function(t) {
			var scale = Math.abs(_sin(t * π * period))
			return 'translate(' + (d * colWidth) + ',' + (-svgHeight / 2 * (scale - 1) ) + ')scale(' + scale + ')'
		}
	}
}

function opacityFn() {
	return function(d) {
		return function(t) {
			return 0.1 + Math.abs(_sin(t * π * period))
		}
	}
}

/**
 * our tween function that returns a function that returns our radius
 * radius is based off of time, t, and will oscilliate between 0 and 1 due to Math.abs
 */
function sizeFn() {
	return function (d) {
		return function(t) {
			// add π / 2 to shift the starting point
			// otherwise, want to take the time with respect to smaller sub sections
			return initRadius * Math.abs(_cos(t * π / 8));
		}
	}
}