import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { MiniInfoBar } from 'components';
const acorn = require('acorn');

export default class CodeAnalysis extends Component {
	codeVal = "";
	ruleVal = "";
	storeCode(e) {
		this.codeVal= e.target.value;
	}
	storeRules(e) {
		this.ruleVal = e.target.value;
	}
	logger() {
		//Nodes can be in 'body', 'expression', 'arguments', 'argument', and 'callee'
		let parsed = acorn.parse(this.codeVal, {locations: true});
		console.log(parsed);
		console.log('--\n--\n--');
		const tests = this.ruleVal.split(",").map(function(testStr) {
			return {
				test: testStr,
			  testsLeft: testStr.split(".")
			}
		});
		const results = {};
		(function execTests(node, tests) {
			if(!tests) return;
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
			if(node.body) {
				if(Array.isArray(node.body)) {
					node.body.forEach(function(childNode) {
						execTests(childNode, newTests);
					});
				} else {
					execTests(node.body, newTests);
				}
			}
		})(parsed, tests);
		console.log(results);
	}
	render() {
		return (
				<div style={{marginTop: "80px"}}>
				<p>Code:</p>
				<textarea onChange={::this.storeCode}/>
				<p>Tests</p>
				<textarea onChange={::this.storeRules}/>
				<br/>
				<button onClick={::this.logger}>Click</button>
				</div>
			   );
	}
}
