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
// Bar Chart
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

// Circles
// function dataViz(incomingData) {
//     incomingData.forEach(d => {
//         d.impact = d.favorites.length + d.retweets.length;
//         d.tweetTime = new Date(d.timestamp);
//     })
//     var maxImpact = d3.max(incomingData, d => d.impact);
//     var startEnd = d3.extent(incomingData, d => d.tweetTime);
//     var timeRamp = d3.scaleTime().domain(startEnd).range([20,480]);
//     var yScale = d3.scaleLinear().domain([0,maxImpact]).range([0,460]);
//     var radiusScale = d3.scaleLinear().domain([0,maxImpact]).range([1,20]);
//     var colourScale = d3.scaleLinear().domain([0,maxImpact]).range(["white", "#75739F"]);

//     d3.select("svg")
//      .selectAll("circle")
//      .data(incomingData)
//      .enter()
//      .append("circle")
//      .attr("r", d => radiusScale(d.impact))
//      .attr("cx", d => timeRamp(d.tweetTime))
//      .attr("cy", d => 480 - yScale(d.impact))
//      .style("fill", d => colourScale(d.impact))
//      .style("stroke", "black")
//      .style("stroke-width", "1px");
// }

// Circles
function dataViz(incomingData) {
    incomingData.forEach(d => {
        d.impact = d.favorites.length + d.retweets.length;
        d.tweetTime = new Date(d.timestamp);
    })
    var maxImpact = d3.max(incomingData, d => d.impact);
    var startEnd = d3.extent(incomingData, d => d.tweetTime);
    var timeRamp = d3.scaleTime().domain(startEnd).range([20,480]);
    var yScale = d3.scaleLinear().domain([0,maxImpact]).range([0,460]);
    var radiusScale = d3.scaleLinear().domain([0,maxImpact]).range([1,20]);
    var colourScale = d3.scaleLinear().domain([0,maxImpact]).range(["white", "#75739F"]);

    var tweetG = d3.select("svg")
     .selectAll("g")
     .data(incomingData)
     .enter()
     .append("g")
     .attr("transform", d => "translate(" + timeRamp(d.tweetTime) + "," + (480 - yScale(d.impact)) + ")");
    
    tweetG.append("circle")
     .attr("r", d => radiusScale(d.impact))
     .style("fill", d => colourScale(d.impact))
     .style("stroke", "black")
     .style("stroke-width", "1px");
    tweetG.append("text")
     .text(d => d.user + "-" + d.tweetTime.getHours());
}