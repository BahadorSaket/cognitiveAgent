function Visualizer(force, svg, dataset)
{
   // This method visualize the network
    var color = d3.scale.category20();
    var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
        return "<strong>Weight:</strong> <span style='color:red'>" + (d.NodeWeight).toFixed(2) + "</span>";
      })
    svg.call(tip);
    var g = svg.append("g");

    force.nodes(dataset.nodes)
         .links(dataset.links)
         .start();
    var link = svg.selectAll(".link")
            .data(dataset.links)
            .enter().append("line")
            .attr("class", function(g){
                  linkClass = "link_hide";

                  for(j=0;j<win_path.length;j++)
                  {
                    if(win_path[j]==g.source.name)
                    {
                      linkClass= "link_show";
                    }
                  }
                  for(j=0;j<loss_path.length;j++)
                  {
                    if(loss_path[j]==g.source.name)
                    {
                      linkClass= "link_show";
                    }
                  }
               return linkClass;
            })
            .style("stroke-width", function(d) { return (Math.sqrt(d.value)*5); });

    var gnodes = svg.selectAll('g.gnode')
           .data(dataset.nodes)
           .enter()
           .append('g')
           .classed('gnode', true)
           .on('mouseover', tip.show)
           .on('mouseout', tip.hide)

     var node = gnodes.append("circle")
            .attr("class", "node")
            .attr("r", function(d){
                if(d.name == team1 || d.name == team2)
                {
                  return 7;
                }
                else if(d.name == "Positive" || d.name == "Negative")
                {
                  return 7;
                }
                else if(d.label =="final" ){
                  return 10;
                }
                else {
                  return 5;
                }
            })
            .style("fill", function(d){
                if(d.name == team1 || d.name == team2)
                {
                  return "Blue";
                }
                else if(d.name == "Positive")
                {
                  return "green";
                }
                else if(d.name == "Negative" )
                {
                  return "red";
                }
                else {
                  return "black";
                }
            })
            .style("opacity", 0.3)
            .call(force.drag);

    var labels = gnodes.append("text")
            .style("font", "12px Arial")
            .attr("fill", function(g){
                 nodeColor="#e6e6e6";
                 for(j=0;j<win_path.length;j++)
                 {
                   if(win_path[j]==g.name)
                   {
                     nodeColor= "black";
                   }
                 }
                 for(j=0;j<loss_path.length;j++)
                 {
                   if(loss_path[j]==g.name)
                   {
                     nodeColor= "black";
                   }
                 }
              return nodeColor;
            })
            .style("font-weight", function(d) { return (d.label=="final") ? "bold" : ""; })
            .text(function(d) { return d.name; });

    force.on("tick", function() {
          link.attr("x1", function(d) { return d.source.x; })
              .attr("y1", function(d) { return d.source.y; })
              .attr("x2", function(d) { return d.target.x; })
              .attr("y2", function(d) { return d.target.y; });

          gnodes.attr("transform", function(d) {
                return 'translate(' + [d.x, d.y] + ')';
              });

        });



}
