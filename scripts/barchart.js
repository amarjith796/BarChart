
$(function () {
    $.getJSON("scripts/sampleData.json", function (data) {
        $.each(data, function (key, val) {
            rendarChart(val, key);
        });
    });
});

function rendarChart(data, divID) {
    var height = 600, width = 1000, margin = 100;
    var svg;
    var xScale, yScale;
    var xDomaindata, yDomaindata;
    svg = d3.select("body").append("svg").attr("width", width).attr("height", height).attr("class",divID);
    XlineAxis(data);
    YLineAxis(data);
    barChartAxis(data);
// x-axis function
    function XlineAxis(xval) {
        var xAxisLenght = width - 2 * margin;
        xDomaindata = [];
        $.each(xval, function (i, value) {
            xDomaindata.push(value.x);
        });
        xScale = d3.scale.ordinal()
                .domain(xDomaindata)
                .rangeBands([0, xAxisLenght], .2);
        var xAxis = d3.svg.axis()
                .scale(xScale)
                .orient("bottom")
                .ticks(10);
        svg.append("g")
                .attr("class", "x-axis")
                .attr("transform", function () {
                    return "translate(" + margin + "," + (height - margin) + ")";
                })
                .call(xAxis);
    }
// y-axis function
    function YLineAxis(yval) {
        var yAxisLength = height - 2 * margin;
        yDomaindata = [];
        $.each(yval, function (i, value) {
            yDomaindata.push(value.y);
        });
        var ymax = parseFloat(d3.max(yDomaindata));
        yScale = d3.scale.linear()
                .domain([0, ymax])
                .range([yAxisLength, 0]);
        var yAxis = d3.svg.axis().scale(yScale).orient("left");
        svg.append("g")
                .attr("class", "y-axis")
                .attr("transform", function () {
                    return "translate(" + margin + "," + margin + ")";
                })
                .call(yAxis);

    }
// Bar chart function axis
    function barChartAxis(sampleData) {
        var rect = svg.append("g").attr("transform", function () {
            return "translate(" + margin + "," + margin + ")";
        }).selectAll(".bar").data(sampleData).enter().append("rect").attr("class", "bar")
        var rectAttributes = rect.attr("x", function (d) {
            return xScale(d.x);
        })
                .attr("y", function (d) {
                    return yScale(d.y);
                })
                .attr("height", function (d) {
                    return (height - 2 * margin) - yScale(d.y);
                })
                .attr("width", xScale.rangeBand());
    }
}