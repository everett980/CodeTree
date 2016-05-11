import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { MiniInfoBar } from 'components';
import { openModal, closeModal } from '../../redux/modules/modalCtrl';
import { connect } from 'react-redux';
import { RuleBox } from 'components';
import { ModalWrapper } from 'components';
const acorn = require('acorn');
const Modal = require('react-modal');

class CodeAnalysis extends Component {
	codeVal = "";
	ruleVal = "";
	storeCode(e) {
		this.codeVal= e.target.value;
	}
	storeRules(e) {
		this.ruleVal = e.target.value;
	}
	logger() {
		let parsed = acorn.parse(this.codeVal, {locations: true});
		console.log(parsed);
		console.log('--\n--\n--');
		//ruleVal is a string containing all rules. separate rules are separated by commas. within a rule, qualifiers are separated by periods.
		//eg "WhileStatement.BlockStatement,VariableDeclaration" would mean that we need to look for a BlockStatement inside of a WhileStatement as rule 1, and a Variable Declaration anywhere is rule 2
		const tests = this.ruleVal.split(",").map(function(testStr) {
			return {
				test: testStr,
			  testsLeft: testStr.split(".")
			}
		});
		const results = {};
		(function execTests(node, tests) {
			if(!node) return;
			if(typeof node !== 'object') return;
			if(!node.hasOwnProperty('type')) return;
			if(!tests) return;
			console.log(node.type);
			console.log(node);
			console.log(tests);
			const newTests = tests.map(function(test) {
				const filteredTests = test.testsLeft.filter(function(testStatement, ind) {
					return ind || (test.testsLeft && node.type.localeCompare(test.testsLeft[0]));
				});
				return {
					test: test.test,
				testsLeft: filteredTests
				}
			}).filter(function(test) {
				if(test.testsLeft.length) {
					return true;
				} else {
					results[test.test] = (Array.isArray(results[test.test])) ? results[test.test].concat([node.loc.start.line]) : [node.loc.start.line];
					return false;
				}
			});
			//Nodes can be in 'body', 'object', 'property', 'left', 'right', 'id', 'params', 'expression', 'arguments', 'argument', and 'callee'
			/* if(node.body) {
				if(Array.isArray(node.body)) {
					node.body.forEach(function(childNode) {
						execTests(childNode, newTests);
					});
				} else {
					execTests(node.body, newTests);
				}
			} */
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
	}
	render() {
		return (
				<div>
				<ModalWrapper/>
				<div style={{marginTop: "80px", width: '50%', float: 'left'}}>
				<p>Code:</p>
				<textarea onChange={::this.storeCode}/>
				<p>Tests</p>
				<textarea onChange={::this.storeRules}/>
				<br/>
				<button onClick={::this.logger}>Click</button>
				</div><div style={{marginTop: "80px", width: '50%', float: 'right'}}>
				<button onClick={::this.props.openModal} style={{float: 'left', clear: 'both'}}>Add Rule</button>
				<hr style={{clear: 'both'}}/>
				<RuleBox style={{clear: 'both'}} rulesArr={['word', 'first.second.third']}/>
				</div>
				<hr style={{clear: 'both'}}/>
				</div>
			   );
	}
}

function mapStateToProps(state) {
	return {
		open: state.modalCtrl.open
	}
}
function mapDispatchToProps(dispatch) {
	return {
		openModal: () => {
					   dispatch(openModal());
				   },
		closeModal: () => {
						dispatch(closeModal());
					}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(CodeAnalysis);
