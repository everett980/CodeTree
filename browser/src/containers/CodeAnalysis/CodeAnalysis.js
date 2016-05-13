import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { MiniInfoBar } from 'components';
import { openModal, closeModal } from '../../redux/modules/modalCtrl';
import { addRule, addLocation, resetLocations } from '../../redux/modules/ruleManager';
import { connect } from 'react-redux';
import { RuleBox } from 'components';
import { ModalWrapper } from 'components';
import { ErrorDisplay } from 'components';
const acorn = require('acorn/dist/acorn_loose');
const Modal = require('react-modal');

class CodeAnalysis extends Component {
	componentWillMount() {
		const propsRef = this.props;
		this.setState({parseErrors: [], showLink: false});
		if(this.props.params) {
			if(this.props.params.ruleStr) {
				this.props.params.ruleStr.split(',').forEach(function(rule) {
					propsRef.addRule(""+rule);
				});
			}
		}
	}
	codeVal = "";
	storeCode(e) {
		this.codeVal= e.target.value;
		this.logger();
	}
	logger() {
		let parsed = acorn.parse_dammit(this.codeVal, {locations: true});
		console.log(parsed);
		console.log('--\n--\n--');
		this.props.resetLocations();
		const tests = Object.keys(this.props.ruleManager).map(function(testStr) {
			return {
				test: testStr,
			  	testsLeft: testStr.split(".")
			}
		});
		const propRef = this.props;
		const results = {};
		const parseErrArr = [];
		(function execTests(node, tests) {
			if(!node) return;
			if(typeof node !== 'object') return;
			if(!node.hasOwnProperty('type')) return;
			if(node.name) {
				if(node.name === "✖") {
					console.log('found error at: ', node.loc.start.line);
					parseErrArr.push(""+node.loc.start.line+":"+node.loc.start.column);
				}
			}
			if(!tests) return;
			const newTests = tests.map(function(test) {
				const filteredTests = test.testsLeft.filter(function(testStatement, ind) {
					if(ind) return true;
					const keys = Object.keys(node);
					for(let i = 0; i<keys.length; i++) {
						if(typeof node[keys[i]] !== 'string') continue;
						const x = node[keys[i]].toLowerCase().indexOf(testStatement.toLowerCase());
						if(x > -1) return false;
					}
					return true;
				});
				return {
					test: test.test,
					testsLeft: filteredTests
				}
			}).filter((test) => {
				if(test.testsLeft.length) {
					return true;
				} else {
					results[test.test] = (Array.isArray(results[test.test])) ? results[test.test].concat([node.loc.start.line]) : [node.loc.start.line];
					propRef.addLocation(test.test, node.loc.start.line);
					return false;
				}
			});
			Object.keys(node).forEach(function(property) {
				let nextToProcess = node[property];
				if(Array.isArray(nextToProcess)) {
					nextToProcess.forEach(function(el) {
						execTests(el, newTests);
					});
				} else {
					execTests(nextToProcess, newTests);
				}
			});
		})(parsed, tests);
		console.log(results);
		this.setState({parseErrors: parseErrArr});
	}
	toggleShowLink() {
		const newShowState = !this.state.showLink;
		this.setState({showLink: newShowState});
	}
	generateLink() {
		if (!Object.keys(this.props.ruleManager).length) return "Add some rules before sharing!";
		return "localhost:3000/shared/"+Object.keys(this.props.ruleManager).map((rule) => {
			return ""+rule+'-'+this.props.ruleManager[rule].yn;
		}).join(",");
	}
	render() {
		return (
				<div>
				<h1>Code Analyzer</h1>
				<ModalWrapper/>
				<div style={{width: '50%', float: 'left'}}>
				<p>Code:</p>
				<textarea onChange={::this.storeCode} style={{maxWidth: '90%'}}/>
				</div><div style={{width: '50%', float: 'right'}}>
				<button onClick={::this.props.openModal} style={{float: 'left', clear: 'both', backgroundColor: '#4169E1', border: '2px solid darkgrey', padding: '5px', margin: '8px'}}>Add Rule</button>
				<hr style={{clear: 'both'}}/>
				<RuleBox style={{clear: 'both'}} rulesObj={this.props.ruleManager}/>
				<hr style={{clear: 'both'}}/>
				<button onClick={::this.toggleShowLink} style={{backgroundColor: '#4169E1', border: '2px solid darkgrey', padding: '5px', margin: '8px'}}>{!this.state.showLink ? 'View Link to Share' : 'Hide Link to Share'}</button>
				<br/>
				{this.state.showLink ? this.generateLink() : ''}
				</div>
				<hr style={{clear: 'both'}}/>
				<ErrorDisplay errArr={this.state.parseErrors}/>
				<hr/>
				<p>Made by Everett Ross</p>
				<a href='https://github.com/everett980/codetree' target="_blank">View Github Repo</a>
				</div>
			   );
	}
}

function mapStateToProps(state) {
	return {
		open: state.modalCtrl.open,
		ruleManager: state.ruleManager
	}
}
function mapDispatchToProps(dispatch) {
	return {
		openModal: () => {
					   dispatch(openModal());
				   },
		closeModal: () => {
						dispatch(closeModal());
					},
		addLocation: (rule, loc) => {
						 dispatch(addLocation(rule, loc));
					},
		resetLocations: () => {
							dispatch(resetLocations());
						},
		addRule: (rule) => {
					 dispatch(addRule(rule));
					}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(CodeAnalysis);
