import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { openModal, closeModal } from '../../redux/modules/modalCtrl';

class DisplayRule extends Component {
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
					{!this.props.isChild ? this.props.rulesObj[this.props.rules].yn : ''}
				</div>
			</div>
		)
	}
}
function mapStateToProps(state) {
	return {
		rulesObj: state.ruleManager
	}
}
function mapDispatchToProps(dispatch) {
	return {
		openModal: () => {
					   dispatch(openModal());
					  }
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(DisplayRule);
