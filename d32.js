/* eslint-disable no-undef */
// set the dimensions and margins of the graph
const margin1 = { top: 100, right: 0, bottom: 0, left: 0 };
    const width1 = 1200 - margin1.left - margin1.right;
    const height1 = 800 - margin1.top - margin1.bottom;
    const innerRadius = 90;
    const outerRadius = Math.min(width1, height1) / 2; // the outerRadius goes from the middle of the SVG area to the border

// append the svg object
const svg1 = d3.select('#circular_barchart')
  .append('svg')
    .attr('width', width1 + margin1.left + margin1.right)
    .attr('height', height1 + margin1.top + margin1.bottom)
  .append('g')
    .attr('transform', `translate(${width1 / 2 + margin1.left}, ${height1 / 2 + margin1.top})`);

    d3.csv('/dataset/artists.csv').then(function (data) {
      const result = [];

      data.forEach(function (a) {
        if (!this[a.Nationality]) {
            this[a.Nationality] = {
                Nationality: a.Nationality,
                orders: 0
            };
            result.push(this[a.Nationality]);
        }
        this[a.Nationality].orders += 1;
    }, Object.create(null));
    console.log(result);
  // sort data
  result.sort(function (b, a) {
    return a.orders - b.orders;
  });
  // Scales
  const x = d3.scaleBand()
      .range([0, 2 * Math.PI]) // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
      .align(0) // This does nothing
      .domain(data.map(d => d.Nationality)); // The domain of the X axis is the list of states.
  const y = d3.scaleRadial()
      .range([innerRadius, outerRadius]) // Domain will be define later.
      .domain([0, 4000]); // Domain of Y is from 0 to the max seen in the data

  // Add the bars
  svg1.append('g')
    .selectAll('path')
    .data(result)
    .join('path')
      .attr('fill', '#69b3a2')
      .attr('d', d3.arc() // imagine your doing a part of a donut plot
          .innerRadius(innerRadius)
          .outerRadius(d => y(d.orders))
          .startAngle(d => x(d.Nationality))
          .endAngle(d => x(d.Nationality) + x.bandwidth())
          .padAngle(0.01)
          .padRadius(innerRadius))
          .append('title')
      .text((result) => {
        return 'Nationality: ' + result.Nationality + ' Value: ' + result.orders;
      });

      svg1.append('text')
      .attr('x', (height1 / 2))
      .attr('y', 0 - (margin1.left / 2))
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('text-decoration', 'underline')
      .text('Hover over bars to see the nationality');
});
