// import * as d3 from "d3";
import React from 'react';
import { connect } from 'react-redux';
import { createTree } from './Simulation3.createTree';

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
		createTree().bind(this);

	}

	render() {
		return (
			<div id='simulation' className='center'>
				<svg
					ref={node => this.node = node}
					>
				</svg>
			</div>
		)
	}
}

const mapDispatch = dispatch => ({})

const mapState = state => ({
	currentNode: state.dictionary,
})

export default connect(mapState, mapDispatch)(Simulation);
