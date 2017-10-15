import React from 'react';
import { connect } from 'react-redux';
import NavBar from './NavBar';
import Simulation from './Simulation';
import Simulation2 from './Simulation2';
import Simulation3 from './Simulation3';
import { getDictionaryTC } from '../store/actions/dictionary'

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.loadInit = this.loadInit();
	}

	loadInit() {
		this.props.getDictionary();
	}

	render () {
		return(
			<div id='main'>
				<NavBar />
				<Simulation2/>
			</div>
		)
	}
}

const dispatch = dispatch => ({
	getDictionary() {
		dispatch(getDictionaryTC());
	},
})

const state = state => ({
})

export default connect(state, dispatch)(Main);
