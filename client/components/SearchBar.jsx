import React from 'react';
import { connect } from 'react-redux';
import { updateQuery } from '../store/actions/query';

function SearchBar (props) {
	return(
		<form>
		  <div className="input-field">
		    <input
		    	id="search"
		    	type="search"
		    	placeholder="search"
		    	onChange={props.updateQuery}
		    	required/>
		    <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
		    <i className="material-icons">close</i>
		  </div>
		</form>
	)
}

const mapState = (state) => ({
	query: state.query
})

const mapDispatch = (dispatch) => ({
	updateQuery: (event) => dispatch(updateQueryTC(event.target.value))
})

export default connect(mapState, mapDispatch)(SearchBar);