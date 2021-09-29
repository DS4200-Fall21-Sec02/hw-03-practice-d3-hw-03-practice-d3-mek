// write your javascript code here.
// feel free to change the preset attributes as you see fit
// References: https://www.d3-graph-gallery.com/graph/scatter_basic.html   
// https://www.d3-graph-gallery.com/graph/barplot_grouped_basicWide.html


let margin = {
    top: 60,
    left: 50,
    right: 30,
    bottom: 35
  },
  width = 2000 - margin.left - margin.right,
  height = 2000 - margin.top - margin.bottom;


// first visualization
let svg1 = d3.select('#vis1')
  .append('svg')
  .attr('preserveAspectRatio', 'xMidYMid meet') // this will scale your visualization according to the size of its parent element and the page.
  .attr('width', '100%') // this is now required by Chrome to ensure the SVG shows up at all
  .style('background-color', '#ccc') // change the background color to light gray
  .attr('viewBox', [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '))


// Extract the Data
let census = d3.csv("data/OlympicMedals.csv")
census.then(function(data) {

  // List of subgroups
  var subgroups = data.columns.slice(1)

  // List of countries
  var countries = new Map(data, function(d){return(d.Country)}).keys()


 var svg = svg1.append('svg')
      .attr('height',height + margin.top + margin.bottom)
      .attr('width',width + margin.left + margin.right)
    .append('g')
      .attr('transform','translate(' + margin.left + ',' + margin.top + ')')



  // X axis
  var x = d3.scaleBand()
      .domain(countries)
      .range([0, width])
      .padding([0.2])
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  //Y axis
  var y = d3.scaleLinear()
    .domain([0, 50])
    .range([ height, 0 ]);
  svg.append("g")
    .style("font", "28px times")   
    .call(d3.axisLeft(y));

  // scale for subgroup
  var xSubgroup = d3.scaleBand()
    .domain(subgroups)
    .range([0, x.bandwidth()])
    .padding([0.05])

  // color
  var color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(['#ffd700','#c0c0c0','#cd7f32'])

  // Show the bar
  svg.append("g")
    .selectAll("g")
    // Enter in data = loop group per group
    .data(data)
    .enter()
    .append("g")
      .attr("transform", function(d) { return "translate(" + x(d.Country) + ",0)"; })
    .selectAll("rect")
    .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
    .enter().append("rect")
      .attr("x", function(d) { return xSubgroup(d.key); })
      .attr("y", function(d) { return y(d.value); })
      .attr("width", xSubgroup.bandwidth())
      .attr("height", function(d) { return height - y(d.value); })
      .attr("fill", function(d) { return color(d.key); });

})


// second visualization
let svg2 = d3.select('#vis2')
  .append('svg')
  .attr('preserveAspectRatio', 'xMidYMid meet') // this will scale your visualization according to the size of its parent element and the page.
  .attr('width', '100%') // this is now required by Chrome to ensure the SVG shows up at all
  .style('background-color', '#ccc') // change the background color to light gray
  .attr('viewBox', [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '))

//Read the data
let census2 = d3.csv("data/AAPL.csv")
census2.then(function(data) {


var svg3 = svg2.append('svg')
      .attr('height',height + margin.top + margin.bottom)
      .attr('width',width + margin.left + margin.right)
    .append('g')
      .attr('transform','translate(' + margin.left + ',' + margin.top + ')')

  // X axis
  var x = d3.scaleLinear()
    .domain([0, 30])
    .range([ 0, width ]);
  svg3.append("g")
    .attr("transform", "translate(0," + height + ")")
    .style("font", "28px times") 
    .call(d3.axisBottom(x));

  // Y axis
  var y = d3.scaleLinear()
    .domain([0, 300])
    .range([ height, 0]);
  svg3.append("g")
    .style("font", "28px times")
    .call(d3.axisLeft(y));

  //dots
  svg3.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.date); } )
      .attr("cy", function (d) { return y(d.close); } )
      .attr("r", 30)
      .style("fill", "#0000FF")

})
