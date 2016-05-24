import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { openModal, closeModal } from '../../redux/modules/modalCtrl';
import { deleteRule } from '../../redux/modules/ruleManager';

class DisplayRule extends Component {
	pass = true;
	successFailStatement(ruleObj) {
		if(ruleObj.yn === "Y") {
			//this rule is required
			if(!ruleObj.loc.length) {
				this.pass = false;
				return "Your code fails to contain the specified structure.";
			} else {
				this.pass = true;
				return "Your code successfully contains the specified structure on the following lines: "+ruleObj.loc.join(", ");
			}
		} else {
			//this rule must not be met
			if(!ruleObj.loc.length) {
				this.pass = true;
				return "Your code successfully does not contain the specified structure.";
			} else {
				this.pass = false;
				return "Your code fails to avoid the specified structure on the following lines: "+ruleObj.loc.join(", ");
			}
		}
	}
	deleteMe() {
		this.props.delete(this.props.rules);
	}
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
		const successFailStyle = {};
		const statement = !this.props.isChild && this.props.rulesObj ? this.successFailStatement(this.props.rulesObj[this.props.rules]) : ''
		if(this.pass) {
			successFailStyle.color = 'rgba(120,153,34,1.0)';
		} else {
			successFailStyle.color = 'rgba(139,0,0,1.0)';
		}
		return (
			<div style={borderStyle}>
				<div style={divStyle}>
					{!this.props.isChild ? (this.props.rulesObj[this.props.rules].yn === 'Y' ? 'Your Code MUST Contain the following structure:' : 'Your Code MUST NOT Contain the following structure:') : ''}
			   		{!this.props.isChild ? <button onClick={::this.deleteMe} style={{backgroundColor: 'rgba(139,0,0, .5)', border: '2px solid darkgrey', marginLeft: '8px'}}>Delete</button> : ''}
					<p style={marginStyle}>	
					{thisRule}
					</p>
					{childrenRules ? <DisplayRule rules={childrenRules} isChild='true'/> : ""}
					<p style={successFailStyle}>{statement}</p>
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
		delete: (r) => {
					   dispatch(deleteRule(r));
					  }
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(DisplayRule);
