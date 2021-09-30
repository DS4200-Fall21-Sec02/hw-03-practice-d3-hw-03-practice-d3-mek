// write your javascript code here.
// feel free to change the preset attributes as you see fit
// References/Resources: https://www.d3-graph-gallery.com/graph/scatter_basic.html   
// https://www.d3-graph-gallery.com/graph/barplot_grouped_basicWide.html


// write your javascript code here.
// feel free to change the preset attributes as you see fit


// set the dimensions and margins of the graph
let margin = {
  top: 60,
  left: 50,
  right: 30,
  bottom: 35
},
width = 4000 - margin.left - margin.right,
height = 1000 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg1 = d3.select("#vis1")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",`translate(${margin.left},${margin.top})`);

// Parse the Data
d3.csv("data/OlympicMedals.csv").then( function(data) {

  // List of subgroups = header of the csv files i.ei. gold, medal, bronze
  const subgroups = data.columns.slice(1)

  // List of groups = countries 
  const groups = data.map(d => d.Country)

  console.log(groups)

  // Add X axis
  const x = d3.scaleBand()
      .domain(groups)
      .range([0, width/7.5])
      .padding([0.2])
  svg1.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x).tickSize(0));

  // Add Y axis
  const y = d3.scaleLinear()
    .domain([0, 50])
    .range([ height, 0 ]);
  svg1.append("g")
    .call(d3.axisLeft(y));

  // Another scale for subgroup position
  const xSubgroup = d3.scaleBand()
    .domain(subgroups)
    .range([0, x.bandwidth()])
    .padding([0.05])

  // color palette = one color per subgroup (the colors are the colors of the medals)
  const color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(['#ffd700','#c0c0c0','#cd7f32'])

  // Show the bars
  svg1.append("g")
    .selectAll("g")
    // Enter in data = loop group per group
    .data(data)
    .join("g")
      .attr("transform", d => `translate(${x(d.Country)}, 0)`)
    .selectAll("rect")
    .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
    .join("rect")
      .attr("x", d => xSubgroup(d.key))
      .attr("y", d => y(d.value))
      .attr("width", xSubgroup.bandwidth())
      .attr("height", d => height - y(d.value))
      .attr("fill", d => color(d.key));

})
// second visualization
width2 = 2000 - margin.left - margin.right,
height2 = 1000 - margin.top - margin.bottom;

let svg2 = d3.select('#vis2')
  .append('svg')
  .attr('width2', '100%') // this is now required by Chrome to ensure the SVG shows up at all
  .style('background-color', '#ccc') // change the background color to light gray
  .attr('viewBox', [0, 0, width2 + margin.left + margin.right, height2 + margin.top + margin.bottom].join(' '))

//Read the data
let stock = d3.csv("data/AAPL.csv")
stock.then(function(data) {


var svg3 = svg2.append('svg')
      .attr('height',height2 + margin.top + margin.bottom)
      .attr('width',width2 + margin.left + margin.right)
    .append('g')
      .attr('transform','translate(' + margin.left + ',' + margin.top + ')')

  // X axis
  var x = d3.scaleLinear()
    .domain([0, 30])
    .range([ 0, width2 ]);
  svg3.append("g")
    .attr("transform", "translate(0," + height2 + ")")
    .style("font", "28px times") 
    .call(d3.axisBottom(x));

  // Y axis
  var y = d3.scaleLinear()
    .domain([0, 300])
    .range([ height2, 0]);
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
      .attr("r", 25)
      .style("fill", "#0000FF")

})
