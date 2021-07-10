
import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import {
	Button,
	Collapse,
	Container,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
} from 'reactstrap';
import '@fortawesome/fontawesome-free/css/all.css';


function UserAvatar(props) {
	// If a user avatar is available, return an img tag with the pic
	if (props.user.avatar) {
		return <img
			src={props.user.avatar} alt="user"
			className="rounded-circle align-self-center mr-2"
			style={{ width: '32px' }}></img>;
	}

	// No avatar available, return a default icon
	return <i
		className="far fa-user-circle fa-lg rounded-circle align-self-center mr-2"
		style={{ width: '32px' }}></i>;
}

function AuthNavItem(props) {
	// If authenticated, return a dropdown with the user's info and a
	// sign out button
	if (props.isAuthenticated) {
		return (
			<UncontrolledDropdown>
				<DropdownToggle nav caret>
					<UserAvatar user={props.user} />
				</DropdownToggle>
				<DropdownMenu right>
					<h5 className="dropdown-item-text mb-0">{props.user.name}</h5>
					<p className="dropdown-item-text text-muted mb-0">{props.user.email}</p>
					<DropdownItem divider />
					<DropdownItem onClick={props.authButtonMethod}>Sign Out</DropdownItem>
				</DropdownMenu>
			</UncontrolledDropdown>
		);
	}

	// Not authenticated, return a sign in link
	return (
		<NavItem>
			<Button
				onClick={props.authButtonMethod}
				className="btn-link nav-link border-0"
				color="link">Sign In</Button>
		</NavItem>
	);
}

export default class NavBar extends React.Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false
		};
	}

	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	render() {
		// Only show calendar nav item if logged in
		let file = null;
		if (this.props.isAuthenticated) {
			file = (
				<NavItem>
					<RouterNavLink to="/file" className="nav-link" exact>File</RouterNavLink>
				</NavItem>
			);
		}

		return (
			<div>
				<Navbar color="dark" dark expand="md" fixed="top">
					<Container>
						<NavbarBrand >Upload To OneDrive</NavbarBrand>
						<NavbarToggler onClick={this.toggle} />
						<Collapse isOpen={this.state.isOpen} navbar>
							<Nav className="mr-auto" navbar>
								<NavItem>
									<RouterNavLink to="/" className="nav-link" exact>Home</RouterNavLink>
								</NavItem>
								{file}
							</Nav>
							<Nav className="justify-content-end" navbar>
								<NavItem>
									<NavLink href="https://developer.microsoft.com/graph/docs/concepts/overview" target="_blank">
										<i className="fas fa-external-link-alt mr-1"></i>
										Docs
									</NavLink>
								</NavItem>
								<AuthNavItem
									isAuthenticated={this.props.isAuthenticated}
									authButtonMethod={this.props.authButtonMethod}
									user={this.props.user} />
							</Nav>
						</Collapse>
					</Container>
				</Navbar>
			</div>
		);
	}
} 