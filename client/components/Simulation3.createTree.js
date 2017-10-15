export function createTree() {

	var diameter = 960;
	var padding = 210;

	var tree = d3.layout.tree()
	    .size([360, diameter / 2 - padding])
	    .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });

	var diagonal = d3.svg.diagonal.radial()
	    .projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });

	var svg = d3.select("body").append("svg")
	    .attr("width", diameter)
	    .attr("height", diameter)
	  .append("g")
	    .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

	d3.selection.prototype.moveToFront = function() {
	  return this.each(function() {
	    this.parentNode.appendChild(this);
	  });
	};

	d3.tsv("d3.v1.tsv", function(files) {
	  var nested1 = processData(files);
	  svg.append("text")
	    .attr("id", "version")
	    .text("v1.29.7")
	    .attr("x", -diameter*0.4)
	    .attr("y", -diameter*0.4)
	    .style("font-size", "32px");
	  treemap(nested1);
	  d3.tsv("d3.v2.tsv", function(files) {
	    var nested2 = processData(files);
	    function update2() {
	      svg.select("#version")
	        .transition().duration(500)
	        .style("opacity", 0)
	        .transition().delay(500)
	        .text("2.10.3")
	        .transition()
	        .style("opacity", 1)
	      treemap(nested2);
	    };
	    setTimeout(update2, 5200);
	    d3.tsv("d3.v3.tsv", function(files2) {
	      var nested3 = processData(files2);
	      function update3() {
	        svg.select("#version")
	        .transition().duration(500)
	        .style("opacity", 0)
	        .transition().delay(500)
	        .text("3.0.0pre")
	        .transition()
	        .style("opacity", 1)
	        treemap(nested3);
	      };
	      setTimeout(update3, 11800);
	    });
	  });
	});

	function processData(files) {
	  files.forEach(function(d) {
	    d.size = parseInt(d.size);
	    d.keys = d.file.replace(".js","").split("/");
	    d.keys.forEach(function(sect,i) {
	      d["section" + i] = sect;
	    });
	  });

	  return burrow(files);
	}

	function treemap(root) {
	  var nodes = tree.nodes(root),
	      links = tree.links(nodes);

	  var link = svg.selectAll(".link")
	    .data(links, function(d) { return d.source.name + "-" + d.target.name;})

	  link
	    .transition()
	      .delay(400)
	      .duration(600)
	      .attr("d", diagonal);

	  link
	    .enter().append("path")
	      .attr("class", "link")
	      .attr("d", diagonal)
	      .style("opacity", 0)
	      .transition()
	      .duration(300)
	      .delay(function(d,i) {
	        return 24*i;
	      })
	      .style("opacity", 1);

	  link.exit()
	    .transition()
	      .duration(400)
	      .style("opacity", 0)
	      .delay(400)
	      .remove();

	  var node = svg.selectAll(".node")
	      .moveToFront()
	      .data(nodes, function(d) { return d.name + "-" + (d.parent ? d.parent.name : "root");})

	   node.exit()
	    .transition()
	      .duration(400)
	      .style("opacity", 0)
	      .delay(400)
	      .remove();

	  node
	    .transition()
	      .delay(400)
	      .duration(800)
	      .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })

	  node.selectAll("text")
	    .transition()
	      .duration(800)
	      .attr("font-weight", null)
	      .attr("fill", "#555")
	      .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
	      .attr("transform", function(d) { return d.x < 180 ? "translate(8)" : "rotate(180)translate(-8)"; })
	      .text(function(d) { return d.name; });

	  var g = node
	    .enter().append("g")
	      .attr("class", "node")
	      .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })

	  g.append("circle")
	    .attr("r", 3)
	    .style("opacity", 0)
	    .transition()
	      .duration(300)
	      .delay(function(d,i) {
	        return 24*i;
	      })
	      .style("opacity", 1);

	  g.append("text")
	    .attr("dy", ".31em")
	    .attr("font-weight", "bold")
	    .attr("fill", "black")
	    .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
	    .attr("transform", function(d) { return d.x < 180 ? "translate(8)" : "rotate(180)translate(-8)"; })
	    .text(function(d) { return d.name; })
	    .style("opacity", 0)
	    .transition()
	      .duration(300)
	      .delay(function(d,i) {
	        return 24*i;
	      })
	      .style("opacity", 1);

	};

	d3.select(self.frameElement).style("height", diameter + "px");
}