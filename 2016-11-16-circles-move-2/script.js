var circleCount = 10;
var drawRadius = 100;
var initRadius = 10;
var speed = 0.9
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
		t_circle.set('cr', 10);
		t_circle.set("starttime", undefined);
		t_circle.set("timelimit", 2000);
		t_circle.set("elapsed", 0);
		t_circle.set('angle', 2 * Math.PI / circleCount * i);
		t_circle.set('x', svgWidth / 2 + drawRadius * Math.cos(2 * Math.PI + (2 * Math.PI * i / circleCount)));
		t_circle.set('y', svgHeight / 2 + drawRadius * Math.sin(2 * Math.PI + (2 * Math.PI * i / circleCount)));
		t_circle.set('scale', 1);
		t_circle.set("move", true);
		currentCircles.push(t_circle);
}

var timeparam = 2000;

var circle = svg.selectAll("circle")
    .data(currentCircles, function(d){ return d.get('id') })
  .enter()
  .append("circle")
    .attr('r', function(d){ return 10 })
    .attr('transform', function(d) { return "translate(" + d.get('x') + "," + d.get('y') + ")"; })
    .attr('fill', function(i) { return i.get('id') % 2 ? 'white' : 'black'})

// timer_ret_val: could be used to stop the timer, but not actually used in this code really. 
var timer_ret_val = false;

// Keeps a record of the elapsed time since the timer began.
var timer_elapsed = 0;

// Kick off the timer, and the action begins: 
d3.timer(tickFn);

function tickFn(_elapsed) {
	timer_elapsed = _elapsed;
	for (var i = 0; i < circleCount; i++) {
		var t_circleData = currentCircles[i];
		
		if(t_circleData.get('move')) { // if move is true
			if(t_circleData.get('starttime') == undefined)
				t_circleData.set('starttime', _elapsed);

			var t_elapsed = _elapsed - t_circleData.get('starttime');
			t_circleData.set('elapsed', t_elapsed);

			var t = t_elapsed / t_circleData.get('timelimit') * speed;
			var t_angle = (2 * Math.PI) * t;
			var t_scale = Math.cos(t_angle) * initRadius;
			var t_x = drawRadius * Math.cos(t_angle + t_circleData.get('angle'));
			var t_y = drawRadius * Math.sin(t_angle + t_circleData.get('angle'));
			t_circleData.set('x', svgWidth / 2 + t_x);
			t_circleData.set('y', svgHeight / 2 + t_y);
			t_circleData.set('scale', t_scale);
		}
	}
	var t_circle = svg.selectAll("circle");
	t_circle.attr('transform', function(d) { return "translate(" + d.get('x') + "," + d.get('y') + ")"});//scale(" + d.get('scale') + ")"; });

	return timer_ret_val;
}