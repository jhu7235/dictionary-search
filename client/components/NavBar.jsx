import React from 'react';
import { connect } from 'react-redux';
import { Navbar, NavItem, Dropdown, Chip, Button } from 'react-materialize';

function NavBar(props) {
	return(
		<div id='nav-bar'>
			<Navbar brand='Dictionary' right>
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
			</Navbar>
{/*			<Navbar brand='Dictionary' right>
				<NavItem href='init.html'>item1</NavItem>
				<NavItem href='init.html'>item2</NavItem>
				<NavItem href='init.html'>item3</NavItem>
				<NavItem href='init.html'>item4</NavItem>
			</Navbar>*/}
		</div>
	)
}

const dispatch = () => ({})

const state = () => ({})

export default connect(state, dispatch)(NavBar);