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
			this.rule = null;
			this.props.closeModal();
		} 
	}
	addBlack() {
		if(this.rule && this.rule.length) {
			this.props.addRule(this.rule+'-N');
			this.rule = null;
			this.props.closeModal();
		} 
	}
	render() {
		//I need to figure out how to have initial data in text input
		return (
				<Modal isOpen={this.props.open} onRequestClose={this.props.closeModal} style={{
					overlay: {
								 backgroundColor: 'rgba(0, 0, 0, .75)'
					},
			   		content: {
			   					 width: '50%',
			   					 height: '80%',
			   					 position: 'absolute',
			   					 top: '10%',
			   				     left: '25%'
					}
				}}>
				<h3 style={{marginTop: '0px'}}>Add Rule:</h3>
				<p>Add rules in the format of OuterRule.MiddleRule.InnerRule</p>
				<p>You can chain as many requirements as you want.</p>
				<p>Example, an IfStatement inside of a for loop inside of a while loop would look like: 'while.for.ifstatement'</p>
				<p>Adding to white list means that the provided code structure must exist, adding to black list means that the provided code structure must not exist.</p>
				<input type='text' onChange={::this.recordRules} style={{width: 'calc(100% - 16px)', padding: '5px', margin: '8px'}}/>
				<br/>
				<button onClick={::this.addWhite} style={{color: 'black', backgroundColor: 'white', border: '2px solid darkgrey', padding: '5px', margin: '8px'}}>Add to White List</button>
				<button onClick={::this.addBlack} style={{color: 'white', backgroundColor: 'black', border: '2px solid darkgrey', padding: '5px', margin: '8px'}}>Add to Black List</button>
				<button onClick={this.props.closeModal} style={{color: 'black', backgroundColor: '#4169E1', border: '2px solid darkgrey', padding: '5px', margin: '8px'}}>Cancel</button>
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
