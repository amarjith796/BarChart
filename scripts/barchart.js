   var sampleData = {
                "data": [
                    {"x_axis": "A", "y_axis": .08167},
                    {"x_axis": "B", "y_axis": .01492},
                    {"x_axis": "C", "y_axis": .02782},
                    {"x_axis": "D", "y_axis": .04253},
                    {"x_axis": "E", "y_axis": .12702},
                    {"x_axis": "F", "y_axis": .02288},
                    {"x_axis": "G", "y_axis": .02015},
                    {"x_axis": "H", "y_axis": .06094},
                    {"x_axis": "I", "y_axis": .06966},
                    {"x_axis": "J", "y_axis": .00153},
                    {"x_axis": "K", "y_axis": .00772},
                    {"x_axis": "L", "y_axis": .04025},
                    {"x_axis": "M", "y_axis": .02406},
                    {"x_axis": "N", "y_axis": .06749},
                    {"x_axis": "O", "y_axis": .07507},
                    {"x_axis": "P", "y_axis": .01929},
                    {"x_axis": "Q", "y_axis": .00095},
                    {"x_axis": "R", "y_axis": .05987},
                    {"x_axis": "S", "y_axis": .06327},
                    {"x_axis": "T", "y_axis": .09056},
                    {"x_axis": "U", "y_axis": .02758},
                    {"x_axis": "V", "y_axis": .00978},
                    {"x_axis": "W", "y_axis": .02360},
                    {"x_axis": "X", "y_axis": .00150},
                    {"x_axis": "Y", "y_axis": .01974},
                    {"x_axis": "Z", "y_axis": .00074}
                ]
            };
            var height = 600, width = 1000, margin = 100;
            var svg;
            var xScale, yScale;
            var xDomaindata, yDomaindata;

            $(function () {
                // will load initChart() function
                initChart();
            });
            // Initialization of the chart function
            function initChart() {
                svg = d3.select("body").append("svg").attr("width", width).attr("height", height);
                XlineAxis();
                YLineAxis();
                barChartAxis();
            }

            // x-axis function
            function XlineAxis() {
                var xAxisLenght = width - 2 * margin;
                xDomaindata = [];
                $.each(sampleData.data, function (i, value) {
                    xDomaindata.push(value.x_axis);
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
            function YLineAxis() {
                var yAxisLength = height - 2 * margin;
                yDomaindata = [];
                $.each(sampleData.data, function (i, value) {
                    yDomaindata.push(value.y_axis);
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
            function barChartAxis() {
                var rect = svg.append("g").attr("transform", function () {
                    return "translate(" + margin + "," + margin + ")";
                }).selectAll(".bar").data(sampleData.data).enter().append("rect").attr("class", "bar")
                var rectAttributes = rect.attr("x", function (d) {
                    return xScale(d.x_axis);
                })
                        .attr("y", function (d) {
                            return yScale(d.y_axis);
                        })
                        .attr("height", function (d) {
                            return (height-2*margin) - yScale(d.y_axis);
                        })
                        .attr("width", xScale.rangeBand());
            }