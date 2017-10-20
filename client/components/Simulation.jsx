// import * as d3 from "d3";
import React from 'react';
import { connect } from 'react-redux';

class Simulation extends React.Component{

	constructor() {
		super();
		this.createTree = this.createTree.bind(this);
		this.currentNode = {}
	}

	componentDidMount() {
		this.createTree();
	}

	componnentDidUpdate() {
		this.createTree();
	}

	createTree() {

		const width = 960,
		    height = 800;

		const tree = d3.layout.tree()
    	.size([width - 20, height - 20]);

    const root = {},
    	nodes = tree(root);

    root.parent = root;
    root.px = root.x;
    root.py = root.y;

    const diagonal = d3.svg.diagonal();

		const svg = d3.select('svg')
			.attr('height', height)
			.attr('width', width)
			.append('g')
			.attr('transform', 'translate(10,10)');

    let node = svg.selectAll('.node')
    let link = svg.selectAll('.link');
    console.log('link', link);
    const duration = 30,
    	timer = setInterval(update, duration);

    function update() {
		  if (nodes.length >= 5000) return clearInterval(timer);

		  // Add a new node to a random parent.
		  function addVirtualNode() {
			  var n = {id: nodes.length},
			      p = nodes[Math.random() * nodes.length | 0];
			  if (p.children) p.children.push(n); else p.children = [n];
			  nodes.push(n);		  	
		  }
		  addVirtualNode();

		  // Recompute the layout and data join.
		  function recomputeLayout() {
			  node = node.data(tree.nodes(root), function(d) { return d.id; });
			  link = link.data(tree.links(nodes), function(d) { return d.source.id + "-" + d.target.id; });
		  }
		  recomputeLayout();

		  // Add entering nodes in the parent’s old position.
		  function addNodeDOM() {
			  node.enter().append("circle")
			      .attr("class", "node")
			      .attr("r", 4)
			      .attr("cx", function(d) { return d.parent.px; })
			      .attr("cy", function(d) { return d.parent.py; });
		  }
		  addNodeDOM();

		  // Add entering links in the parent’s old position.
		  function addLinkDOM() {
			  link.enter().insert("path", ".node")
			      .attr("class", "link")
			      .attr("d", function(d) {
			        var o = {x: d.source.px, y: d.source.py};
			        return diagonal({source: o, target: o});
			      });
		  }
		  addLinkDOM();

		  // Transition nodes and links to their new positions.
		  function transition() {
			  var t = svg.transition()
			      .duration(duration);

			  t.selectAll(".link")
			      .attr("d", diagonal);

			  t.selectAll(".node")
			      .attr("cx", function(d) { return d.px = d.x; })
			      .attr("cy", function(d) { return d.py = d.y; });
		  }
		  transition();
    }
	}

	render() {
		return (
			<div id='simulation' className='center'>
				<svg
					ref={node => this.node = node}
					>
				</svg>
				<div id='search-feild'>
				<input
					type='text'
					/>
				</div>
			</div>
		)
	}
}

const mapDispatch = dispatch => ({})

const mapState = state => ({
	currentNode: state.dictionary,
})

export default connect(mapState, mapDispatch)(Simulation);
