import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import {
	Navbar,
	Nav,
	Alert,
	ListGroup,
	ListGroupItem,
	NavItem,
	NavLink,
	FormGroup,
	Form,
	Label,
	Input, Button, Col, Row
} from 'reactstrap';

const Menu = () => {
	return (
		<div>
			<Navbar color="light" light expand="md">
				<Nav className="ml-0" navbar>
					<NavItem>
						<NavLink href="/" >anecdotes</NavLink>
					</NavItem>
					<NavItem>
						<NavLink href='/create'>create new</NavLink>
					</NavItem>
					<NavItem>
						<NavLink href='/about'>about</NavLink>
					</NavItem>
				</Nav>
			</Navbar>
			<p />
		</div>
	);
};

const AnecdoteList = ({ anecdotes }) => (
	<div>
		<h2>Anecdotes</h2>
		<p />
		<ListGroup>
			{anecdotes.map(anecdote =>
				<ListGroupItem key={anecdote.id} tag="a" href={`/notes/${anecdote.id}`}>
					{anecdote.content}
				</ListGroupItem>
			)}
		</ListGroup>
	</div>
);

const Anecdote = ({ anecdote }) => {
	return (
		<div>
			<h2>{anecdote.content} by {anecdote.author}</h2>
			<div>has {anecdote.votes} votes</div>
			<div>for more info see <a href={anecdote.info}>{anecdote.info}</a></div>
		</div>
	);
};

const About = () => (
	<div>
		<h2>About anecdote app</h2>
		<Row>
			<Col sm={8}>
				<p>According to Wikipedia:</p>

				<em>An anecdote is a brief, revealing account of an individual person or an incident.
					Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
					such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
					An anecdote is &quot;a story with a point.&quot;</em>
				<p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
			</Col>
			<Col sm={4}>
				<img src="https://upload.wikimedia.org/wikipedia/commons/0/01/LinuxCon_Europe_Linus_Torvalds_03_%28cropped%29.jpg" alt="torvalds" style={{ width: '100%' }} />
			</Col>
		</Row>
	</div>
);

const Footer = () => (
	<div>
		Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

		See <a href='https://github.com/tuomasmakinen/fullstackopen/tree/master/osa6/router_anekdootit'>https://github.com/tuomasmakinen/fullstackopen/tree/master/osa6/router_anekdootit</a> for the source code.
	</div>
);

class CreateNew extends React.Component {
	constructor() {
		super();
		this.state = {
			content: '',
			author: '',
			info: ''
		};
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.addNew({
			content: this.state.content,
			author: this.state.author,
			info: this.state.info,
			votes: 0
		});
		this.props.notify(`new anecdote, '${this.state.content}', was created!`, 10000);
		this.props.history.push('/');
	};

	render() {
		return(
			<div>
				<h2>create a new anecdote</h2>
				<Col>
					<Form onSubmit={this.handleSubmit}>
						<FormGroup>
							<Label for="contentField">Content</Label>
							<Input type="text" name="content" id="contentField" />
						</FormGroup>
						<FormGroup>
							<Label for="authorField">Author</Label>
							<Input type="text" name="author" id="authorField" />
						</FormGroup>
						<FormGroup>
							<Label for="urlField">URL</Label>
							<Input type="text" name="url" id="urlField" />
						</FormGroup>
						<Button>Create</Button>
					</Form>
				</Col>
			</div>
		);
	}
}

const Notification = ({ notification }) => {
	if (notification === '') {
		return null;
	}

	return (
		<Alert color="success">
			{notification}
		</Alert>
	);
};

class App extends React.Component {
	constructor() {
		super();

		this.state = {
			anecdotes: [
				{
					content: 'If it hurts, do it more often',
					author: 'Jez Humble',
					info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
					votes: 0,
					id: '1'
				},
				{
					content: 'Premature optimization is the root of all evil',
					author: 'Donald Knuth',
					info: 'http://wiki.c2.com/?PrematureOptimization',
					votes: 0,
					id: '2'
				}
			],
			notification: ''
		};
	}

	addNew = (anecdote) => {
		anecdote.id = (Math.random() * 10000).toFixed(0);
		this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) });
	};

	anecdoteById = (id) =>
		this.state.anecdotes.find(a => a.id === id);

	vote = (id) => {
		const anecdote = this.anecdoteById(id);

		const voted = {
			...anecdote,
			votes: anecdote.votes + 1
		};

		const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a);

		this.setState({ anecdotes });
	};

	notify = (notification, timeout) => {
		this.setState({ notification });
		setTimeout(() => {
			this.setState({ notification: '' });
		}, timeout);
	};

	render() {
		return (
			<div className="container">
				<Col sm={10} className="offset-1">
					<h1>Software anecdotes</h1>
					<p />
					<Router>
						<div>
							<Menu />
							<Notification notification={this.state.notification} />
							<Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} /> } />
							<Route exact path="/notes/:id" render={({ match }) =>
								<Anecdote anecdote={this.anecdoteById(match.params.id)} />}
							/>
							<Route path="/create" render={({ history }) =>
								<CreateNew history={history} notify={this.notify} addNew={this.addNew}/> }
							/>
							<Route path="/about" render={() => <About /> } />
						</div>
					</Router>
					<p />
					<Footer />
				</Col>
			</div>
		);
	}
}

export default App;