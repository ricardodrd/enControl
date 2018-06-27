/*AXIS CLASS*/
d3.axisTop()
d3.axisRight()
d3.axisBottom()
d3.axisLeft()

var data = [80, 100, 56, 120, 100, 30, 40, 160];

var svgWidth=500, svgHeight=300;

var svg = d3.select('svg')
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr("class", "svg-container");

var line = svg.append("line")
    .attr("x1", 100)
    .attr("x2", 500)
    .attr("y1", 50)
    .attr("y2", 50)
    .attr("stroke", "red")
    .attr("stroke-width",2);
var rect = svg.append("rect")
    .attr("x", 100)
    .attr("y", 100)
    .attr("width",200)
    .attr("height",100)
    .attr("fill", "#9B95FF");

var xScale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, svgWidth]);
var yScale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([svgHeight, 0]);

var x_axis = d3.axisBottom()
    .scale(xScale);
var y_axis = d3.axisLeft()
    .scale(yScale);

svg.append("g")
    .attr("transform","translate(50,10)")
    .call(y_axis);

var xAxisTranslate=svgHeight-20;

svg.append("g")
    .attr("transform", "translate(50,"+ xAxisTranslate+ ")")
    .call(x_axis);
