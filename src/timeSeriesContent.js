import * as d3 from 'd3';

let node = document.createElement('div');

const [svgWidth, svgHeight] = [1200, 300];
const margin = {
    left: 30,
    right: 20,
    top: 20,
    bottom: 30
};
const [width, height] = [svgWidth - margin.left - margin.right, svgHeight - margin.top - margin.bottom];

function translate(x, y) {
    return 'translate(' + x + ',' + y + ')';
}

let svg = d3.select(node).append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight)

let lineChart = svg.append('g')
    .attr('class', 'timeSeries')
    .attr('width', width)
    .attr('height', height)
    .attr('transform', translate(margin.left, margin.top))

let xAxisLine = lineChart.append('g').attr('class', 'xAxis');
let yAxisLine = lineChart.append('g').attr('class', 'yAxis');

export function initTimeSeries(timeSeriesData) {
    const data = Object.entries(timeSeriesData);
    console.log(data);
    console.log(new Date(data[0][0]))
    const startTime = new Date(data[0][0]);
    const endTime = new Date(data[data.length-1][0]);
    console.log(d3.max(data.map(d => d[1])));

    let xScale = d3.scaleTime()
        .domain([startTime, endTime]).range([0, width]);
    let yScale = d3.scaleLinear()
        .domain([0, d3.max(data.map(d => d[1]))]).range([height, 0]);

    let line = d3.line()
        .x(function (d) { return xScale(new Date(d[0])); }) // set the x values for the line generator
        .y(function (d) { return yScale(d[1]); }) // set the y values for the line generator 
        .curve(d3.curveMonotoneX) // apply smoothing to the line

    lineChart.append('path')
        .datum(data)
        .attr('class', 'line')
        .attr('d', line);


    xAxisLine.transition().call(d3.axisBottom(xScale));
    yAxisLine.transition().call(d3.axisLeft(yScale));

}

export default node;