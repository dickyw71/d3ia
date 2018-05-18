// import d3 from './d3.js'

// (() => { 
    d3.csv("cities.csv", (data, i, array, error) => { 
        if(error) console.log(error);
        dataViz(data) 
    })
// })();

function dataViz(incomingData) {
    console.log(incomingData.label)

    d3.select("body")
    .selectAll("div.cities")
    .data(incomingData)
    .enter()
    .append("div")
    .attr("class", "cities")
    .html(d => d.label);
}
