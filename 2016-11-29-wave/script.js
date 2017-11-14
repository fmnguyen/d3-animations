// Parameters to mess around with to change how the sine wave moves
var circleCount = 60,
	col = 60,
 	initRadius = 2,
 	colWidth = 10,
 	circleHeight = 4;

var amp = 1, 	// amplitude
	ß = 1, 		// period
	time = 2000,
	speed = 2;

var π = Math.PI;
var color = d3.scaleOrdinal(d3.schemeCategory20);

var t = d3.transition()
			.duration(time * speed)
			.ease(d3.easeSinInOut)

var s = d3.transition()
			.duration(time * speed)
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
var gHeight = (circleCount * initRadius * 2) + ((circleCount - 1) * circleHeight);
var xCenter = svgWidth / 2 - gHeight / 2;

// create our background svg parent
var svg = d3.select('.background').append('svg')
			.attr('width', svgWidth)
			.attr('height', svgHeight)
			.style('background-color', 'transparent')
			.style('position', 'absolute')

// create col many groups, representative of each column across the page
var g = svg.selectAll('g')
			.data(d3.range(1, col, 1))
		.enter()
		.append('g')
			.attr('transform', function(d) {
				return 'translate(' + ((svgWidth / 2 - col * colWidth / 2) + (d * colWidth)) + ',' + xCenter + ')scale(0)'
			});

// create each of the circles for each group element
var circle = g.selectAll("circle")
    .data(d3.range(1, circleCount, 1))
  .enter()
  .append("circle")
    .attr('r', initRadius)
    .attr('cy', function(d, i){ return initRadius + ((i * initRadius * 2) + (i * circleHeight)) })
    .attr('fill', function(d) { return 'white'; })

// add a transition to each of the group objects to transform it's scale
// as a function of time
g.transition(t)
	.delay(function(d){ return d * (time * speed / col); })
	.on('start', function repeat() { // where we're repeating
		// while our current is active, we want to move scale the size
		d3.active(this)
				.attrTween('transform', scaleFn())
				.attrTween('opacity', opacityFn())
			.transition(t)
				.on('start', repeat) // after all this is done, we want to repeat this animation
	});


function scaleFn() {
	return function(d) {
		return function(t) {
			var scale = 0.15 + Math.abs(amp * _sin(ß * (t * π)));
			var x = (svgWidth / 2 - col * colWidth / 2) + (d * colWidth)
			var y = ((xCenter + initRadius * 2) + ((-gHeight / 2) * (scale - 1)))
			return 'translate(' + [x , y] + ')scale(' + scale + ')';
		}
	}
}

function opacityFn() {
	return function(d) {
		return function(t) {
			return 0.5 + Math.abs(amp * _sin(ß * (t * π)))
		}
	}
}