import React, {Component, PropTypes} from 'react';
import { DisplayRule } from 'components';

export default class RuleBox extends Component {
	render() {
		return (
				<div>
				{this.props.rulesArr.map(function(rule, ind) {
					return <DisplayRule rules={rule} key={ind}/>;
				})}
				</div>
			);
	}
}
