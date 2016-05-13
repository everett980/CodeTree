import React, {Component, PropTypes} from 'react';

export default class ErrorDisplay extends Component {
	convertFromLnColToText(arr) {
		return arr.map(function(loc) {
			return "Line #"+loc.split(':')[0]+" Column #"+loc.split(':')[1];
		}).join(", ");
	}
	render() {
		const errorStatementStyle = {};
		if(this.props.errArr.length) {
			errorStatementStyle.color = 'rgba(139,0,0,1.0)';
		} else {
			errorStatementStyle.color = 'rgba(120,153,34,1.0)';
		}
		if(!this.props.errArr.length) return (
				<div style={errorStatementStyle}>
					No errors found while parsing!
				</div>
				);
		return (
				<div style={errorStatementStyle}>
					Parsing Errors found at: {this.convertFromLnColToText(this.props.errArr)}
				</div>
			);
	}
}
