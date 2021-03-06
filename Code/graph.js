//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js
//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js
// Set the dimensions of the canvas / graph
var	margin = {top: 30, right: 20, bottom: 30, left: 50},
	width = 600 - margin.left - margin.right,
	height = 270 - margin.top - margin.bottom;

// Parse the date / time
var	parseDate = d3.time.format("%d-%b-%y").parse;
var formatTime = d3.time.format("%e %B");// Format tooltip date / time

// Set the ranges
var	x = d3.time.scale().range([0, width]);
var	y = d3.scale.linear().range([height, 0]);

// Define the axes
var	xAxis = d3.svg.axis().scale(x)
	.orient("bottom").ticks(5);

var	yAxis = d3.svg.axis().scale(y)
	.orient("left").ticks(5);

// Define the line
var	valueline = d3.svg.line()
	.x(function(d) { return x(d.date); })
	.y(function(d) { return y(d.close); });

// Define 'div' for tooltips
var div = d3.select("body")
	.append("div")  // declare the tooltip div 
	.attr("class", "tooltip")              // apply the 'tooltip' class
	.style("opacity", 0);                  // set the opacity to nil

// Adds the svg canvas
var	svg = d3.select("body")
	.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", 
		      "translate(" + margin.left + "," + margin.top + ")");

// Get the data
//d3.csv("data.csv", function(error, data) {

var data = [
{date: "1-May-12", close: 58.13},
{date: "30-Apr-12", close: 53.98},
{date: "27-Apr-12",close: 67.00},
{date: "26-Apr-12",close:89.70},
{date: "25-Apr-12",close:99.00},
{date: "24-Apr-12",close:130.28},
{date: "23-Apr-12",close:166.70},
{date: "20-Apr-12",close:234.98},
{date: "19-Apr-12",close:345.44},
{date: "18-Apr-12",close:443.34},
{date: "17-Apr-12",close:543.70},
{date: "16-Apr-12",close:580.13}];

var data2 = [
{date: "1-May-12", close: 58.13},
{date: "30-Apr-12", close: 53.98},
{date: "27-Apr-12",close: 67.00},
{date: "26-Apr-12",close:89.70},
{date: "25-Apr-12",close:99.00},
{date: "24-Apr-12",close:130.28},
{date: "23-Apr-12",close:166.70},
{date: "20-Apr-12",close:234.98},
{date: "19-Apr-12",close:345.44},
{date: "18-Apr-12",close:443.34},
{date: "17-Apr-12",close:543.70},
{date: "16-Apr-12",close:580.13}];

	data.forEach(function(d) {
		d.date = parseDate(d.date);
		d.close = +d.close;
	});

	// Scale the range of the data
	x.domain(d3.extent(data, function(d) { return d.date; }));
	y.domain([0, d3.max(data, function(d) { return d.close; })]);

	// Add the valueline path.
	svg.append("path")		
		.attr("class", "line")
		.attr("d", valueline(data));

	// draw the scatterplot
	svg.selectAll("dot")									
		.data(data)											
	.enter().append("circle")								
		.attr("r", 5)	
		.attr("cx", function(d) { return x(d.date); })		 
		.attr("cy", function(d) { return y(d.close); })
	// Tooltip stuff after this
	    .on("mouseover", function(d) {		
            div.transition()
				.duration(500)	
				.style("opacity", 0);
			div.transition()
				.duration(200)	
				.style("opacity", .9);	
			div	.html(
				'<a href= "https://google.com">' + // The first <a> tag
				formatTime(d.date) +
				"</a>" +                          // closing </a> tag
				"<br/>"  + d.close)	 
				.style("left", (d3.event.pageX) + "px")			 
				.style("top", (d3.event.pageY - 28) + "px");
			});

	// Add the X Axis
	svg.append("g")	
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	// Add the Y Axis
	svg.append("g")	
		.attr("class", "y axis")
		.call(yAxis);

//});