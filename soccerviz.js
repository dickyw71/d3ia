function createSoccerViz() {
  d3.csv("worldcup.csv")
    .then(data => { overallTeamViz(data) })

  function overallTeamViz(incomingData) {
    d3.select("svg")
      .append("g")
      .attr("id", "teamsG")
      .attr("transform", "translate(50,300)")
      .selectAll("g")
      .data(incomingData)
      .enter()
      .append("g")
      .attr("class", "overallG")
      .attr("transform", (d, i) => "translate(" + (i * 50) + ", 0)")
    var teamG = d3.selectAll("g.overallG");
    teamG
      .append("circle").attr("r", 0)
      .transition()
      .delay((d,i) => i * 100)
      .duration(500)
      .attr("r", 40)
      .transition()
      .duration(500)
      .attr("r", 20)
    teamG
      .append("text")
      .attr("y", 30)
      .text(d => d.team)
    teamG
      .select("text").style("pointer-events", "none");

      // Highlight teams from same region
    teamG.on("mouseover", highlightRegion);
    function highlightRegion(d,i) {
      var teamColor = d3.rgb("#75739F")
      d3.select(this).select("text").classed("active", true).attr("y", 10)
        d3.selectAll("g.overallG").select("circle")
            .style("fill", p => p.region === d.region ?
              teamColor.darker(.75) : teamColor.brighter(.5))
      this.parentElement.appendChild(this);
    }
    teamG.on("mouseout", unHighlight)
    function unHighlight() {
      d3.selectAll("g.overallG").select("circle").attr("class", "")
      d3.selectAll("g.overallG").select("text")
      .classed("active", false).attr("y", 30)
    }

    // Buttons
    const dataKeys = Object.keys(incomingData[0])
      .filter(d => d !== "team" && d !== "region")
    d3.select("#controls").selectAll("button.teams")
      .data(dataKeys).enter()
      .append("button")
      .on("click", buttonClick)
      .html(d => d);

    function buttonClick(datapoint) {
      var maxValue = d3.max(incomingData, d => parseFloat(d[datapoint]))
      var tenColorScale = d3.scaleOrdinal()
          .domain(["UEFA","CONMEBOL"])
          .range(d3.schemeCategory10)
          .unknown("#c4b9ac")
      var radiusScale = d3.scaleLinear().domain([0, maxValue]).range([2, 20])
      d3.selectAll("g.overallG").select("circle").transition().duration(1000)
        .style("fill", p => tenColorScale(p.region))
        .attr("r", d => radiusScale(d[datapoint]))
    }
  }
}