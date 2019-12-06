StackedAreaChart = function(_parentElement, _data){
    this.parentElement = _parentElement;
    this.data = _data;

    this.initVis();
};


StackedAreaChart.prototype.initVis = function(){
    let vis = this;

    vis.margin = { top: 40, right: 0, bottom: 60, left: 350 };

    vis.width = 800 - vis.margin.left - vis.margin.right,
        vis.height = 400 - vis.margin.top - vis.margin.bottom;

    vis.first = false;


    // SVG drawing area
    vis.svg = d3.select("#" + vis.parentElement).append("svg")
    // Container class to make it responsive.
        .classed("svg-container", true)
        // Responsive SVG needs these 2 attributes and no width and height attr.
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 600 400")
        // Class to make it responsive.
        .classed("svg-content-responsive", true)
        // .attr("width", vis.width + vis.margin.left + vis.margin.right)
        // .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");



    // Scales and axes
    vis.x = d3.scaleTime()
        .range([0, vis.width])
        .domain(d3.extent(vis.data, function(d) { return parseDateYM(d.date); }));

    vis.y = d3.scaleLinear()
        .range([vis.height, 0]);

    vis.xAxis = d3.axisBottom()
        .scale(vis.x);

    vis.yAxis = d3.axisLeft()
        .scale(vis.y);

    vis.svg.append("g")
        .attr("class", "x-axis axis")
        .attr("transform", "translate(0," + vis.height + ")");

    vis.svg.append("g")
        .attr("class", "y-axis axis");


// Define the div for the tooltip
    vis.toolDiv = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);


    vis.area = d3.area()
    .curve(d3.curveBasis)
        .x(function(d) { return vis.x(parseDateYM(d.data.key)); })
        .y0(function(d) { return vis.y(d[0]); })
        .y1(function(d) { return vis.y(d[1]); });

    vis.colorScale = d3.scaleOrdinal().range(['#fff5f0','#fee0d2','#fcbba1','#fc9272','#fb6a4a','#ef3b2c','#cb181d','#a50f15','#67000d'].reverse())

    vis.wrangleData();
};


StackedAreaChart.prototype.wrangleData = function(){
    let vis = this;

    var nestedData = d3.nest()
        .key(function(d) { return d.date;})
        .key(function(d) { return d.OFFENSE_DESCRIPTION;})
        .rollup(function (d) {
            return d.length
        })
        .entries(vis.data);


    vis.dataCategories = []
    nestedData[0].values.forEach(function (d) {
        vis.dataCategories.push(d.key)
    });

    if (vis.first) {
        vis.colorScale.domain(vis.dataCategories.sort())
    };



    nestedData = nestedData.sort(function (a, b) {
        return parseDateYM(a.key) - parseDateYM(b.key)
    });

    vis.stack = d3.stack()
        .keys(vis.dataCategories.sort())
        .value(function (d, key) {

            var values = d.values.filter(function (obj) {
                return obj.key == key
            })

            if (values.length ==  0) {
                return 0
            }
            else {
                return values[0].value
            }
        });

    vis.stackedData = vis.stack(nestedData);

    vis.displayData = vis.stackedData;

    vis.updateVis();
};

StackedAreaChart.prototype.updateVis = function() {
    var vis = this;


    vis.y.domain([0, d3.max(vis.displayData, function(d) {
        return d3.max(d, function(e) {
            return e[1];
        });
    })
    ]);


// Draw the layers
    var categories = vis.svg.selectAll(".area")
        .data(vis.displayData);

    categories.enter().append("path")
        .attr("class", "area")
        .on("mouseover", function(d) {
            vis.toolDiv.transition()
                .duration(200)
                .style("opacity", .9);
            vis.toolDiv.html(d.key)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            vis.toolDiv.transition()
                .duration(500)
                .style("opacity", 0);
        })


        .merge(categories)
        .transition()
        .style("fill", function(d) {
            return vis.colorScale(d.key);
        })
        .attr("d", function(d) {
            return vis.area(d);
        });

    categories.exit().remove()

    var legendBoxWidth = 20;
    var buffer = 10;


    vis.svg.selectAll('rect')
        .data(vis.colorScale.domain())
        .enter()
        .append('rect')
        .attr('width', legendBoxWidth)
        .attr('height', legendBoxWidth)
        .attr('fill', function (d) {
            return vis.colorScale(d)
        })
        .attr('x', -300)
        .attr('y', function(d, index) { return 50 + (legendBoxWidth + buffer) * index })


    var legends = vis.svg.selectAll('.legendLabel')
        .data(vis.colorScale.domain())
        .enter()
        .append('text')
        .text(function (d) {
            if ( toTitleCase(d) == "Class A") {
               return toTitleCase(d) + " (heroin, morphine, GHB, Special K)";
            }
            else if ( toTitleCase(d) == "Class B") {
               return toTitleCase(d) + " (cocaine, LSD, oxycodone, ecstacy, methamphetamine)";
            }
            else if ( toTitleCase(d) == "Class C") {
                return toTitleCase(d) + " (prescription tranquilizers and narcotics, hallucinogenic drugs)";
            }
            else if ( toTitleCase(d) == "Class D") {
                return toTitleCase(d) + " (marijuana)";
            }
            else if ( toTitleCase(d) == "Class E") {
                return toTitleCase(d) + " (prescription drugs containing weaker amounts of Opiates)";
            }
            else if ( toTitleCase(d) == "Other") {
                return toTitleCase(d);
            }
        })
        .attr('x', -275)
        .attr('y', function(d, index) { return 65 + (legendBoxWidth + buffer) * index })
        .attr('class', 'legendLabel')

    console.log(vis.x(parseDateYM('12/2016')))
    vis.svg.append('line')
        .attr('x1', vis.x(parseDateYM('12/2016')))
        .attr('x2', vis.x(parseDateYM('12/2016')))
        .attr('y1', 0)
        .attr('y2', vis.height)
        .attr('class', 'area-chart-time');


    // Call axis functions with the new domain
    vis.svg.select(".x-axis").call(vis.xAxis);
    vis.svg.select(".y-axis").call(vis.yAxis);

    vis.first = false;
}