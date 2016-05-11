import React, { Component } from 'react';
import { connect } from 'react-redux';
const Modal = require('react-modal');
import { openModal, closeModal } from '../../redux/modules/modalCtrl';
import { deleteRule, addRule } from '../../redux/modules/ruleManager';

class ModalWrapper extends Component {
	recordRules(e) {
		this.rule = e.target.value;
	}
	addWhite() {
		if(this.rule && this.rule.length) {
			this.props.addRule(this.rule+'-Y');
		} else {
			this.wasError = true;
		}
	}
	addBlack() {
		if(this.rule && this.rule.length) {
			this.props.addRule(this.rule+'-N');
		} else {
			this.wasError = true;
		}
	}
	render() {
		//I need to figure out how to have initial data in text input
		return (
				<Modal isOpen={this.props.open} onRequestClose={this.props.closeModal}>
				<p>Add Rule:</p>
				<input type='text' onChange={::this.recordRules}/>
				<br/>
				<button onClick={::this.addWhite}>Add to White List</button>
				<button onClick={::this.addBlack}>Add to Black List</button>
				<br/>
				{this.wasError ? 'There was an error, please ensure there is a rule entry and then try again.' : ''}
				<button onClick={this.props.closeModal}>Cancel</button>
				</Modal>
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
		addRule: (r) => {
					 dispatch(addRule(r));
				},
		openModal: () => {
					   dispatch(openModal());
				   },
		closeModal: () => {
						dispatch(closeModal());
					}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(ModalWrapper);
