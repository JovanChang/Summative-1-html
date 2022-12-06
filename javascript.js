/**
 * Search Bar
 * @type {Element}
 */

const search = document.getElementById('search_btn');

/**
 * Search bar function
 * @param {string} search
 */
search.onclick = function () {
  window.alert('Could not find your search term');
};

/**
 * The svg HTML element forming from d3.csv("artworks.csv")
 * @type {Element}
 */
const artsStats = document.getElementById('my_dataviz');

/**
 * The svg HTML element forming from d3.csv("artists.csv")
 * @type {Element}
 */
const artistsStats = document.getElementById('circular_barchart');

/**
 * HTML button element toggling the svg element "artsStats"
 * @type {Element}
 */
const btn1 = document.getElementById('class_btn');

/**
 * HTML button element toggling the svg element "artistsStats"
 * @type {Element}
 */
const btn2 = document.getElementById('nationality_btn');

/**
 * Function for toggling the svg HTML element using the (btn1) button HTML element
 * @param {string} search
 */
btn1.onclick = function () {
  if (artsStats.style.display !== 'block') {
    artsStats.style.display = 'block';
  } else {
    artsStats.style.display = 'none';
  }
};

/**
 * Function for toggling the svg HTML element using the (btn2) button HTML element
 * @param {Element} search
 */
btn2.onclick = function () {
  if (artistsStats.style.display !== 'block') {
    artistsStats.style.display = 'block';
  } else {
    artistsStats.style.display = 'none';
  }
};

/**
 * HTML button element to submit HTML form
 * @type {Element}
 */
const reply = document.getElementById('contact_submit');

/**
 * Function sending an alert message after clicking on the (reply) HTML element
 * @param {Element} reply
 */
reply.onclick = function () {
    window.alert('Thank you for leaving a message! You will be replied very soon');
};

// slideshow function from w3school: https://www.w3schools.com/howto/howto_js_slideshow.asp
// Setting the first slideshow element to be the default element
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
// eslint-disable-next-line no-unused-vars
function plusSlides (n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
// eslint-disable-next-line no-unused-vars
function currentSlide (n) {
  showSlides(slideIndex = n);
}

function showSlides (n) {
  let i;
  const slides = document.getElementsByClassName('mySlides');
  const dots = document.getElementsByClassName('dot');
  if (n > slides.length) { slideIndex = 1; }
  if (n < 1) { slideIndex = slides.length; }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(' active', '');
  }
  slides[slideIndex - 1].style.display = 'block';
  dots[slideIndex - 1].className += ' active';
}

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
console.log(result);
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
// add title labels to the graph
  svg.append('text')
    .attr('x', (width / 2))
    .attr('y', 0 - (margin.top / 2))
    .attr('text-anchor', 'middle')
    .style('font-size', '16px')
    .style('text-decoration', 'underline')
    .text('Top catorgeries of artworks in the museum');
});

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
      .align(0)
      .domain(data.map(d => d.Nationality));
  const y = d3.scaleRadial()
      .range([innerRadius, outerRadius])
      .domain([0, 4000]);

  // Add the bars
  svg1.append('g')
    .selectAll('path')
    .data(result)
    .join('path')
      .attr('fill', '#69b3a2')
      .attr('d', d3.arc()
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
