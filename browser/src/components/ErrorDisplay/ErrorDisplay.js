import React, {Component, PropTypes} from 'react';

export default class ErrorDisplay extends Component {
	convertFromLnColToText(arr) {
		return arr.map(function(loc) {
			return "Line #"+loc.split(':')[0]+" Column #"+loc.split(':')[1];
		}).join(", ");
	}
	render() {
		console.log(this.props.errArr);
		if(!this.props.errArr.length) return (<div/>);
		return (
				<div>
					Parsing Errors found at: {this.convertFromLnColToText(this.props.errArr)}
				</div>
			);
	}
}
