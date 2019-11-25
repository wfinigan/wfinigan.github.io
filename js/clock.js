
//2015 by hour of day
//(ignore "count")
var dataset1 = [
    { count: 25, num: 125},
    { count: 25, num: 42 },
    { count: 25, num: 48 },
    { count: 25, num: 24 },
    { count: 25, num: 12 },
    { count: 25, num: 11 },
    { count: 25, num: 29 },
    { count: 25, num: 68 },
    { count: 25, num: 58 },
    { count: 25, num: 72 },
    { count: 25, num: 107 },
    { count: 25, num: 119 },
    { count: 25, num: 182 },
    { count: 25, num: 183 },
    { count: 25, num: 203 },
    { count: 25, num: 208 },
    { count: 25, num: 339 },
    { count: 25 , num: 404 },
    { count: 25, num: 428 },
    { count: 25, num: 285 },
    { count: 25, num: 178 },
    { count: 25, num: 101 },
    { count: 25, num: 57 },
    { count: 25, num: 31 }
];

//2016 by hour of day
var dataset2 = [
    { count: 25, num: 156 },
    { count: 25, num: 69 },
    { count: 25, num: 43 },
    { count: 25, num: 22 },
    { count: 25, num: 37 },
    { count: 25, num: 10 },
    { count: 25, num: 46 },
    { count: 25, num: 40 },
    { count: 25, num: 83 },
    { count: 25, num: 91 },
    { count: 25, num: 160 },
    { count: 25, num: 223 },
    { count: 25, num: 227 },
    { count: 25, num: 296 },
    { count: 25, num: 302 },
    { count: 25, num: 279 },
    { count: 25, num: 483 },
    { count: 25, num: 628 },
    { count: 25, num: 592 },
    { count: 25, num: 449 },
    { count: 25, num: 263 },
    { count: 25, num: 108 },
    { count: 25, num: 94 },
    { count: 25, num: 39 }
];

//2017 by hour of day
var dataset3 = [
    { count: 25, num: 101 },
    { count: 25, num: 62 },
    { count: 25, num: 54 },
    { count: 25, num: 16 },
    { count: 25, num: 27 },
    { count: 25, num: 11 },
    { count: 25, num: 37 },
    { count: 25, num: 58 },
    { count: 25, num: 96 },
    { count: 25, num: 94 },
    { count: 25, num: 168 },
    { count: 25, num: 205 },
    { count: 25, num: 195 },
    { count: 25, num: 229 },
    { count: 25, num: 240 },
    { count: 25, num: 271 },
    { count: 25, num: 435 },
    { count: 25, num: 523 },
    { count: 25, num: 484 },
    { count: 25, num: 345 },
    { count: 25, num: 226 },
    { count: 25, num: 122 },
    { count: 25, num: 65 },
    { count: 25, num: 41 }
];
var hours = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]

//2018 by hour of day
var dataset4 = [
    { count: 25, num: 107 },
    { count: 25, num: 82 },
    { count: 25, num: 39 },
    { count: 25, num: 26 },
    { count: 25, num: 40},
    { count: 25, num: 17 },
    { count: 25, num: 47 },
    { count: 25, num: 34 },
    { count: 25, num: 56 },
    { count: 25, num: 89 },
    { count: 25, num: 132 },
    { count: 25, num: 147 },
    { count: 25, num: 238 },
    { count: 25, num: 254 },
    { count: 25, num: 267 },
    { count: 25, num: 254 },
    { count: 25, num: 329 },
    { count: 25, num: 427 },
    { count: 25, num: 488 },
    { count: 25, num: 389 },
    { count: 25, num: 271 },
    { count: 25, num: 113 },
    { count: 25, num: 51 },
    { count: 25, num: 38 }
];
var margin = {top: 50, right: 50, bottom: 50, left: 50};


var width = 500 - margin.right-margin.left;
var height = 500-margin.top-margin.bottom;
var donutWidth = 95;
var radius1 = Math.min(width, height)/2;
var radius2 = radius1/2 + 50;
var radius3 = radius2/2 + 20;
var radius4 = radius3/2 + 10;



var colorScale = d3.scaleQuantize()
    .range([ "#E3F2FD","#BBDEFB", "#90CAF9", "#1976D2","#0D47A1","#1A237E" ])
    .domain([-50,650])

var div = d3.select("#clock").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var svg = d3.select('#clock')
    .append('svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var svg1 = svg.append('g')
    .attr('transform', 'translate(' + (width / 2) +
        ',' + (height / 2) + ')');
var svg2 = svg.append('g')
    .attr('transform', 'translate(' + (width / 2) +
        ',' + (height / 2) + ')');
var svg3 = svg.append('g')
    .attr('transform', 'translate(' + (width / 2) +
        ',' + (height / 2) + ')');
var svg4 = svg.append('g')
    .attr('transform', 'translate(' + (width / 2) +
        ',' + (height / 2) + ')');

var arc1 = d3.arc()
    .innerRadius(radius1 - donutWidth)
    .outerRadius(radius1);
var arc2 = d3.arc()
    .innerRadius(radius2 - donutWidth)
    .outerRadius(radius2);
var arc3 = d3.arc()
    .innerRadius(radius3 - donutWidth)
    .outerRadius(radius3);
var arc4 = d3.arc()
    .innerRadius(0)
    .outerRadius(radius4);

var pie = d3.pie()
    .value(function(d) { return d.count; })
    .sort(null);

var path1 = svg1.selectAll('path')
    .data(pie(dataset4))
    .enter()
    .append('path')
    .attr('d', arc1)
    .attr("stroke-width", 2)
    .attr("stroke","white")
    .attr('fill', function(d, i) {
        return colorScale(dataset4[i].num);
    })
    .on("mouseover", function (d, i) {
        div.transition()
            .duration(800)
            .style("opacity", .9);
        div.html("Year: 2018 " + "<br>" +"Hour: " + hours[i] + "<br>" +
            "# of Drug Violations: " + d.data.num)
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 45) + "px")
    })
    .on("mouseout", function (d) {
        div.transition()
            .duration(800)
            .style("opacity", 0);
    })

var path2 = svg2.selectAll('path')
    .data(pie(dataset3))
    .enter()
    .append('path')
    .attr("stroke-width", 2)
    .attr("stroke","white")
    .attr('d', arc2)
    .attr('fill', function(d, i) {
        return colorScale(dataset3[i].num);
    })
    .on("mouseover", function (d, i) {
        div.transition()
            .duration(800)
            .style("opacity", .9);
        div.html("Year: 2017 " + "<br>" +"Hour: " + hours[i] + "<br>"+
            "# of Drug Violations: " + d.data.num)
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 45) + "px")
    })
    .on("mouseout", function (d) {
        div.transition()
            .duration(800)
            .style("opacity", 0);
    })
var path3 = svg3.selectAll('path')
    .data(pie(dataset2))
    .enter()
    .append('path')
    .attr('d', arc3)
    .attr("stroke-width", 2)
    .attr("stroke","white")
    .attr('fill', function(d, i) {
        return colorScale(dataset2[i].num);
    })
    .on("mouseover", function (d, i) {
        div.transition()
            .duration(800)
            .style("opacity", .9);
        div.html("Year: 2016 " + "<br>" +"Hour: " + hours[i] + "<br>"+
            "# of Drug Violations: " + d.data.num)
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 45) + "px")
    })
    .on("mouseout", function (d) {
        div.transition()
            .duration(800)
            .style("opacity", 0);
    })
var path4 = svg4.selectAll('path')
    .data(pie(dataset1))
    .enter()
    .append('path')
    .attr("stroke-width", 2)
    .attr("stroke","white")
    .attr('d', arc4)
    .attr('fill', function(d, i) {
        return colorScale(dataset1[i].num);
    })
    .on("mouseover", function (d, i) {
        div.transition()
            .duration(800)
            .style("opacity", .9);
        div.html("Year: 2015 " + "<br>" + "Hour: " + hours[i] + "<br>"+
            "# of Drug Violations: " + d.data.num)
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 45) + "px")
    })
    .on("mouseout", function (d) {
        div.transition()
            .duration(800)
            .style("opacity", 0);
    })

svg.append("text")
    .attr("x", (width / 2))
    .attr("y", (height/2.3))
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .text("2015");
svg.append("text")
    .attr("x", (width / 2))
    .attr("y", (height/3))
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .text("2016");
svg.append("text")
    .attr("x", (width / 2))
    .attr("y", (height/5))
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .text("2017");
svg.append("text")
    .attr("x", (width / 2))
    .attr("y", (height/20))
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .text("2018");


//labels around edges:

svg.append("text")
    .attr("x", (width / 2 + 30))
    .attr("y", (-15))
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .text("12:00am");
svg.append("text")
    .attr("x", (width / 2 + 85))
    .attr("y", (0))
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .text("1:00");
svg.append("text")
    .attr("x", (width / 2 + 140))
    .attr("y", (30))
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .text("2:00");
svg.append("text")
    .attr("x", (width / 2 + 180))
    .attr("y", (70))
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .text("3:00");
svg.append("text")
    .attr("x", (width / 2 + 210))
    .attr("y", (125))
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .text("4:00");
svg.append("text")
    .attr("x", (width / 2 + 220))
    .attr("y", (185))
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .text("5:00");
svg.append("text")
    .attr("x", (width / 2 + 220))
    .attr("y", (height-165))
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .text("6:00");
svg.append("text")
    .attr("x", (width / 2 + 210))
    .attr("y", (height - 110))
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .text("7:00");
svg.append("text")
    .attr("x", (width / 2 +180))
    .attr("y", (height-60))
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .text("8:00");
svg.append("text")
    .attr("x", (width / 2 + 140))
    .attr("y", (height-25))
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .text("9:00");
svg.append("text")
    .attr("x", (width / 2 + 84))
    .attr("y", (height + 10))
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .text("10:00");
svg.append("text")
    .attr("x", (width / 2 + 25))
    .attr("y", (height + 25))
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .text("11:00");

svg.append("text")
    .attr("x", (width / 2 - 30))
    .attr("y", (-15))
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .text("11:00");
svg.append("text")
    .attr("x", (width / 2 - 85))
    .attr("y", (0))
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .text("10:00");
svg.append("text")
    .attr("x", (width / 2 - 140))
    .attr("y", (30))
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .text("9:00");
svg.append("text")
    .attr("x", (width / 2 - 180))
    .attr("y", (70))
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .text("8:00");
svg.append("text")
    .attr("x", (width / 2 - 210))
    .attr("y", (125))
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .text("7:00");
svg.append("text")
    .attr("x", (width / 2 - 220))
    .attr("y", (185))
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .text("6:00");
svg.append("text")
    .attr("x", (width / 2 - 220))
    .attr("y", (height-165))
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .text("5:00");
svg.append("text")
    .attr("x", (width / 2 - 210))
    .attr("y", (height - 110))
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .text("4:00");
svg.append("text")
    .attr("x", (width / 2 -180))
    .attr("y", (height-60))
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .text("3:00");
svg.append("text")
    .attr("x", (width / 2 - 140))
    .attr("y", (height-25))
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .text("2:00");
svg.append("text")
    .attr("x", (width / 2 - 90))
    .attr("y", (height + 10))
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .text("1:00");
svg.append("text")
    .attr("x", (width / 2 -35))
    .attr("y", (height + 25))
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .text("12:00pm");


var w = 70, h = 140;

var key = d3.select("#clock")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

var legend = key.append("defs")
    .append("svg:linearGradient")
    .attr("id", "gradient")
    .attr("x1", "100%")
    .attr("y1", "100%")
    .attr("x2", "100%")
    .attr("y2", "0%")
    .attr("spreadMethod", "pad");

legend.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "#E3F2FD")
    .attr("stop-opacity", 1);


legend.append("stop")
    .attr("offset", "20%")
    .attr("stop-color", "#BBDEFB")
    .attr("stop-opacity", 1);

legend.append("stop")
    .attr("offset", "40%")
    .attr("stop-color", "#90CAF9")
    .attr("stop-opacity", 1);
legend.append("stop")
    .attr("offset", "60%")
    .attr("stop-color",  "#1976D2")
    .attr("stop-opacity", 1);

legend.append("stop")
    .attr("offset", "80%")
    .attr("stop-color", "#0D47A1")
    .attr("stop-opacity", 1);

legend.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#1A237E")
    .attr("stop-opacity", 1);


key.append("rect")
    .attr("width", 40)
    .attr("height", h)
    .style("fill", "url(#gradient)")
    .attr("transform", "translate(-20,10)");

var y = d3.scaleLinear()
    .range([-20, h-10])
    .domain([650, -50]);

var yAxis = d3.axisRight()
    .scale(y)
    .ticks(5);

key.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(20,30)")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("axis title");


