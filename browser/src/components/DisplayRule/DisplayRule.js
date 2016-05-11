import React, {Component, PropTypes} from 'react';

export default class DisplayRule extends Component {
	render() {
		let thisRule;
		let childrenRules;
		if(this.props.rules) {
			const ruleArr = this.props.rules.split(".");
			thisRule = ruleArr.shift();
			childrenRules = ruleArr.join(".");
		}
		const divStyle = {
			float: 'left',
			clear: 'both'
		}
		const borderStyle = {
			overflow: 'hidden'
		}
		const marginStyle = {
			marginBottom: '0px',
		}
		if(this.props.isChild) {
			divStyle['marginLeft'] = '10px';
		} else {
			borderStyle['border'] = '2px';
		}
		if(!childrenRules) {
			marginStyle['marginBottom'] = '5px';
		}
		return (
			<div style={borderStyle}>
				<div style={divStyle}>
					<p style={marginStyle}>	
					{thisRule}
					</p>
					{childrenRules ? <DisplayRule rules={childrenRules} isChild='true'/> : ""}
				</div>
			</div>
		)
	}
}
