import React, { Component } from 'react';
import { connect } from 'react-redux';
const Modal = require('react-modal');
import { openModal, closeModal } from '../../redux/modules/modalCtrl';

class ModalWrapper extends Component {
	render() {
		return (
				<Modal isOpen={this.props.open} onRequestClose={this.props.closeModal}>
				Hello!
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
		openModal: () => {
					   dispatch(openModal());
				   },
		closeModal: () => {
						dispatch(closeModal());
					}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(ModalWrapper);
