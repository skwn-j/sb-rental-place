import * as d3 from 'd3';

let node = document.createElement('div');

const [svgWidth, svgHeight] = [1200, 300];
const margin = {
    left: 40,
    right: 10,
    top: 20,
    bottom: 30
};
const [width, height] = [svgWidth - margin.left - margin.right, svgHeight - margin.top - margin.bottom];

function translate(x, y) {
    return 'translate(' + x + ',' + y + ')';
}

let svg = d3.select(node).append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight);


let line = d3.line()
    .x(function (d) { return xScale(new Date(d[0])); }) // set the x values for the line generator
    .y(function (d) { return yScale(d[1]); }) // set the y values for the line generator 
    .curve(d3.curveMonotoneX) // apply smoothing to the line
let lineChart = svg.append('g')
    .attr('class', 'timeSeries')
    .attr('width', width)
    .attr('height', height)
    .attr('transform', translate(margin.left, margin.top));

let xScale = d3.scaleTime()
let yScale = d3.scaleLinear()
let xAxisLine = lineChart.append('g')
    .attr('class', 'xAxis').attr('transform', translate(0, height));
let yAxisLine = lineChart.append('g')
    .attr('class', 'yAxis');

let brush = d3.brushX()
    .extent([
        [0, 0],
        [width, height]
    ])
    .on("brush end", brushed);



export function initTimeSeries(timeSeriesData) {
    const data = Object.entries(timeSeriesData);
    const startTime = new Date(data[0][0]);
    const endTime = new Date(data[data.length - 1][0]);

    xScale = d3.scaleTime()
        .domain([startTime, endTime]).range([0, width]);
    yScale = d3.scaleLinear()
        .domain([0, d3.max(data.map(d => d[1]))]).range([height, 0]);




    lineChart.append('path')
        .datum(data)
        .attr('class', 'line')
        .attr('d', line)
        .style('fill', 'none')
        .style('stroke', '#ffab00')
        .style('stroke-width', 2)

    lineChart.selectAll(".dot")
        .data(data)
        .enter().append("circle") // Uses the enter().append() method
        .attr("class", "dot") // Assign a class for styling
        .attr("cx", (d) => xScale(new Date(d[0])))
        .attr("cy", (d) => yScale(d[1]))
        .attr("r", 4)

    xAxisLine.call(d3.axisBottom(xScale));
    yAxisLine.call(d3.axisLeft(yScale));

    lineChart.append('g')
        .attr('class', 'brush')
        .call(brush)
        .call(brush.move, xScale.range())
}

function brushed() {
    console.log('brush start');
    if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
    let s = d3.event.selection || xScale.range();
    let startDate = xScale.invert(s[0]);
    let endDate = xScale.invert(s[1]);
    console.log(startDate);
    console.log(endDate);
}

export default node;