import d3 from 'd3';


const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export let node = document.createElement('div');

function translate(x, y) {
    return 'translate(' + x + ',' + y + ')';
}
const svgWidth = 600
const svgHeight = 900

const margin = {left:40 , right:40, top: 20, bottom: 20} 



export function drawBarChart(id, data, day) {
    //const [id, data] = props;
    console.log(id)
    const [startData, endData] = data;
    console.log(startData);
    console.log(endData);
    console.log(day);
    const Object.keys(startData).filter(key => {
        const keyToDate = new Date(key);
        return keyToDate.getDay() == day;
    }))

    /*
    let dayButtons = board

    let svg_b = board
        .append('svg')
        .attr('width', 280)
        .attr('height', 880)
        .append('g')
        .attr('transform', translate(10, 10));

    svg_b.selectAll('button')
        
    let bxAxis =
        svg_b
            .append('g')
            .attr('class', 'xAxis')
            .attr('transform', translate(0, height));
    let byAxis =
        svg_b
            .append('g')
            .attr('class', 'yAxis');

    let isWDL = 0;
    if (selected_wdl == 'W') isWDL = 3;
    else if (selected_wdl == 'L') isWDL = 2;
    else if (selected_wdl == 'D') isWDL = 1;
    let existingTeam = [];
    selected_rankings.forEach(function (d) {
        existingTeam.push(d.team);
    });
    let bx = d3.scaleBand()
        .domain(existingTeam)
        .range([0, width]);
    let by = d3.scaleLinear()
        .domain([0, d3.max(selected_rankings, d => +Object.values(d)[isWDL])])
        .range([height, 0]);
    let barChart = svg_b.selectAll('rect').data(selected_rankings, d => d.team);

    barChart.exit().remove()
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
    new_barData.transition().duration(delay).delay(delay).style('opacity', 1);
    bxAxis.transition().duration(delay).call(d3.axisBottom(bx));
    byAxis.transition().duration(delay).call(d3.axisLeft(by));
        */
}