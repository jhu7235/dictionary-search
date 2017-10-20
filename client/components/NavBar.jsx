import React from 'react';
import { connect } from 'react-redux';
import { Navbar, NavItem, Dropdown, Chip, Button } from 'react-materialize';
import SearchBar from './SearchBar';
function NavBar(props) {
	return(
		<div id='nav-bar'>
			<Navbar>

				<div className='row'>

	        <div className="col l4 m12 s12">
	          <a href="#" className="brand-logo">Logo</a>
	          <a href="#" data-activates="mobile-menu" className="button-collapse"><i className="material-icons">menu</i></a>
	        </div>

        	<div className='col l3 m12 s12' id="search-field">
        		<SearchBar/>
					</div>

{/*					<div className="col l5 m12 s12">

						<Dropdown trigger={
								<NavItem>Drop me!</NavItem>
							}>
							<NavItem>one</NavItem>
							<NavItem>two</NavItem>
							<NavItem divider />
							<NavItem>three</NavItem>
						</Dropdown>
						<NavItem href='get-started.html'>Getting started</NavItem>
						<NavItem href='components.html'>Components</NavItem>

					</div>
*/}
				</div>

			</Navbar>

		</div>
	)
}

const dispatch = () => ({})

const state = () => ({})

export default connect(state, dispatch)(NavBar);