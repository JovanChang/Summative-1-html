/* eslint-disable no-undef */
// d3.csv("/dataset/artworks.csv", function(data) {
//     console.log(data);
// });
// d3.csv("/dataset/artworks_class.csv", function(data) {
//     console.log(data);
// })

// set the dimensions and margins of the graph

const margin = { top: 80, right: 60, bottom: 100, left: 60 };
const width = 1200 - margin.left - margin.right;
const height = 1000 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select('#my_dataviz')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

// Parse the Data
d3.csv('/dataset/artworks.csv').then(function (data) {
  const result = [];

  data.forEach(function (a) {
    if (!this[a.Classification]) {
        this[a.Classification] = {
            Classification: a.Classification,
            orders: 0
        };
        result.push(this[a.Classification]);
    }
    this[a.Classification].orders += 1;
}, Object.create(null));

  // sort data
  result.sort(function (b, a) {
    return a.orders - b.orders;
  });
  // X axis
  const x = d3.scaleBand()
    .range([0, width])
    .domain(result.map(d => d.Classification))
    .padding(0.2);
  svg.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(x))
    .selectAll('text')
    .attr('transform', 'translate(-10,0)rotate(-45)')
    .style('text-anchor', 'end');

  // Add Y axis
  const y = d3.scaleLinear()
    .domain([0, 35000])
    .range([height, 0]);
  svg.append('g')
    .call(d3.axisLeft(y));

  // Bars
  svg.selectAll('mybar')
    .data(result)
    .enter()
    .append('rect')
    .attr('x', d => x(d.Classification))
    .attr('y', d => y(d.orders))
    .attr('width', x.bandwidth())
    .attr('height', d => height - y(d.orders))
    .attr('fill', '#69b3a2')
    .append('title')
    .text((result) => {
      return result.orders;
    });

  svg.append('text')
    .attr('x', (width / 2))
    .attr('y', 0 - (margin.top / 2))
    .attr('text-anchor', 'middle')
    .style('font-size', '16px')
    .style('text-decoration', 'underline')
    .text('Top catorgeries of artworks in the museum');
});
