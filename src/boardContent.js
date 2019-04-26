import * as d3 from 'd3';


const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export let node = document.createElement('div');

function translate(x, y) {
    return 'translate(' + x + ',' + y + ')';
}
const svgWidth = 600
const svgHeight = 600
const margin = { left: 40, right: 40, top: 20, bottom: 20 }
const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;


export function drawBarChart(id, data, day) {
    //const [id, data] = props;
    const [startData, endData] = data;
    const startKeysOfDay = Object.keys(startData).filter(key => {
        const keyToDate = new Date(key);
        return keyToDate.getDay() === day;
    });
    console.log(startKeysOfDay);

    const startDataOfDay = startData[startKeysOfDay[0]]

    const endKeysOfDay = Object.keys(endData).filter(key => {
        const keyToDate = new Date(key);
        return keyToDate.getDay() === day;
    });
    const endDataOfDay = endData[endKeysOfDay[0]]

    let svgBar = node
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', translate(margin.left, margin.top));

    let bxAxis =
        svgBar
            .append('g')
            .attr('class', 'xAxis')
            .attr('transform', translate(0, height / 2));
    let byAxis =
        svgBar
            .append('g')
            .attr('class', 'yAxis');

    let bx = d3.scaleTime()
        .domain([0, 24])
        .range([0, width]);

    let by = d3.scaleLinear()
        .domain([-10, 10])
        .range([height, 0]);

    let plusBarChart = svgBar.selectAll('plus').data(selected_rankings, d => d.team);
    let new_barData = barChart.enter()
        .append('rect')
        .attr('class', d => d.team)
        .attr('width', width / existingTeam.length)
        .style('fill', d => colorScale(teamList.indexOf(d.team) / teamList.length))
        .attr('height', d => height - by(+Object.values(d)[isWDL]))
        .attr('x', (d, i) => (width / existingTeam.length) * i)
        .attr('y', (d, i) => by(+Object.values(d)[isWDL]))
        .style('opacity', 0)
        .on('mouseover', function (k) {
            set_hovered(k);
        })
        .on('mouseleave', function (k) {
            free_hovered(k);
        });
    barChart
        .transition().duration(delay)
        .attr('width', width / existingTeam.length)
        .style('fill', d => colorScale(teamList.indexOf(d.team) / teamList.length))
        .attr('height', d => height - by(+Object.values(d)[isWDL]))
        .attr('x', (d, i) => (width / existingTeam.length) * i)
        .attr('y', (d, i) => by(+Object.values(d)[isWDL]));




    let minusBarChart = svgBar.selectAll('minus').data(selected_rankings, d => d.team);
    barChart.exit().remove()

    new_barData.transition().duration().delay().style('opacity', 1);
    bxAxis.transition().duration().call(d3.axisBottom(bx));
    byAxis.transition().duration().call(d3.axisLeft(by));

}