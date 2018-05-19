// import d3 from './d3.min.js';

// Page 68
// The cities.csv data drawn as a bar chart using the maximum value of population attribute in the domain setting of the scale

// d3.csv("cities.csv")
//  .then(function dataViz(incomingData) { 
//     var maxPopulation = d3.max(incomingData, d => parseInt(d.population)); 
//     var yScale = d3.scaleLinear().domain([0, maxPopulation]).range([0, 460]); 
    
//     d3.select("svg")
//      .attr("style", "height: 480px; width: 600px;"); 
     
//     d3.select("svg")
//      .selectAll("rect")
//      .data(incomingData)
//      .enter()
//      .append("rect")
//      .attr("width", 50)
//      .attr("height", d => yScale(parseInt(d.population)))
//      .attr("x", (d, i) => i * 60)
//      .attr("y", d => 480 - yScale(parseInt(d.population)))
//      .style("fill", "#FE9922")
//      .style("stroke", "#9A8B7A")
//      .style("stroke-width", "1px") 
// })

// p69
// Nested bar chart with hierarchical data

d3.json("tweets.json")
 .then( (data) => { dataViz(data.tweets) });

function dataViz(incomingData) {
    var nestedTweets = d3.nest()
        .key(d => d.user)
        .entries(incomingData);
    nestedTweets.forEach(d => {
        d.numTweets = d.values.length;
    });
    var maxTweets = d3.max(nestedTweets, d => d.numTweets);
    var yScale = d3.scaleLinear().domain([0, maxTweets]).range([0,500]);
    d3.select("svg")
        .selectAll("rect")
        .data(nestedTweets)
        .enter()
        .append("rect")
        .attr("width", 50)
        .attr("height", d => yScale(d.numTweets))
        .attr("x", (d,i) => i * 60)
        .attr("y", d => 500 - yScale(d.numTweets))
        .style("fill", "#FE9922")
        .style("stroke", "#9A8B7A")
        .style("stroke-width", "1px");
}