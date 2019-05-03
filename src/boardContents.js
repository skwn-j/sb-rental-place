import * as d3 from 'd3';
import { createRequireFromPath } from 'module';
import { max } from 'moment';

const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

let node = document.createElement('div');

const svgWidth = 600
const svgHeight = 600
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
    .attr('height', svgHeight)


let barChart = svg.append('g')
    .attr('class', 'timeSeries')
    .attr('width', width)
    .attr('height', height)
    .attr('transform', translate(margin.left, margin.top))

let xAxisBar = barChart.append('g')
    .attr('class', 'xAxis').attr('transform', translate(0, height));
let yAxisBar = barChart.append('g')
    .attr('class', 'yAxis');

export function initBoardContents(boardData, day, hour, range) {
    let depData = Object.entries(boardData.rental[0]);
    let arrData = Object.entries(boardData.rental[1]);

    depData = depData.filter(d => (new Date(d[0])).getDay() === day)
    arrData = arrData.filter(d => (new Date(d[0])).getDay() === day)
    console.log(depData);
    console.log(arrData);

    let depDataSum = []
    let arrDataSum = []
    for (let i = 0; i < 24; i++) {
        depDataSum.push(depData.reduce((acc, currVal) => acc + currVal[1][i], 0))
        arrDataSum.push(arrData.reduce((acc, currVal) => acc + currVal[1][i], 0))
    }
    depDataSum = depDataSum.map(d => Math.round(d / depData.length))
    arrDataSum = arrDataSum.map(d => Math.round(d / arrData.length))
    //console.log(depDataSum);
    //console.log(arrDataSum);
    const max = d3.max(depDataSum.concat(arrDataSum))
    //console.log(max);

    let xScale = d3.scaleLinear()
        .domain([0, 24])
        .range([0, width]);
    /*
    let xScale = d3.scaleBand()
        .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23])
        .range([0, width]);
    */
    let yScale = d3.scaleLinear()
        .domain([-max, max]).range([height, 0]);

    barChart.selectAll('.arrival').remove()
    barChart.selectAll('.departure').remove()


    barChart.selectAll('arrival').data(arrDataSum).enter()
        .append('rect')
        .attr('class', 'arrival')
        .attr('width', width / 24)
        .style('fill', (d, i) => {
            if((hour <= i) && (i < hour + range)) {
                return 'black';
            }
            else {
                return 'blue';
            }
        })
        .attr('height', d => height / 2 - yScale(d))
        .attr('x', (d, i) => (width / 24) * i)
        .attr('y', d => yScale(d))

    barChart.selectAll('departure').data(depDataSum).enter()
        .append('rect')
        .attr('class', 'departure')
        .attr('width', width / 24)
        .style('fill', (d, i) => {
            if((hour <= i) && (i < hour + range)) {
                return 'black';
            }
            else {
                return 'red';
            }
        })
        .attr('height', d => height / 2 - yScale(d))
        .attr('x', (d, i) => (width / 24) * i)
        .attr('y', d => height / 2)



    xAxisBar.call(d3.axisBottom(xScale));
    yAxisBar.call(d3.axisLeft(yScale));

}




export default node;