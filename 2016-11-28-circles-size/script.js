// using d3.v4.min.js
var circleCount = 10;
var drawRadius = 100;
var initRadius = 20;
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
			.attr('class', 'svg')
			.attr('width', svgHeight)
			.attr('height', svgWidth)
			.style('background-color', 'transparent')
			.style('position', 'absolute')
			.append('g');

for (var i = 1; i <= circleCount; i++) {
	var t_circle = d3.map();
		t_circle.set('id', i);
		t_circle.set('cr', initRadius);
		// initialize each circle to be evenly placed around our draw radius
		t_circle.set('angle', 3 * π / 2 + (2 * π * i / circleCount));
		t_circle.set('x', svgWidth / 2 + drawRadius * _cos(3 * π / 2 + (2 * π * i / circleCount)));
		t_circle.set('y', svgHeight / 2 + drawRadius * _sin(3 * π / 2 + (2 * π * i / circleCount)));
		currentCircles.push(t_circle);
}

/**
 * IDEA
 * instead of rotating each x/y point of each circle, rotate the svg object that it stays in instead
 */

var circle = svg.selectAll("circle")
    .data(currentCircles, function(d){ return d.get('id') })
  .enter()
  .append("circle")
    .attr('r', function(d){ return d.get('cr') })
    .attr('cx', function(d){ return d.get('x') })
    .attr('cy', function(d){ return d.get('y') })
    .attr('fill', function(d) { return '#C3423B'/*color(d.get('id'))*/ })
    .transition(t)
    .delay(function(d){ return d.get('id') * (timeparam * speed / circleCount); })
    .on('start', function repeat() { // where we're repeating
    	// while our current is active, we want to move scale the size
    	// our rotation animation is being handled by our css animation
    	d3.active(this)
    			.attrTween('r', sizeFn())
    			.attrTween('opacity', opacityFn())
    		.transition(t)
    			.on('start', repeat) // after all this is done, we want to repeat this animation
    });


function opacityFn() {
	return function(d) {
		return function(t) {
			return 0.1 + Math.abs(_cos(t * π))
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
			return initRadius * Math.abs(_cos(t * π));
		}
	}
}