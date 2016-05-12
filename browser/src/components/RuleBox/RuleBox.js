import React, {Component, PropTypes} from 'react';
import { DisplayRule } from 'components';
import { connect } from 'react-redux';
import { openModal, closeModal } from '../../redux/modules/modalCtrl';

class RuleBox extends Component {
	render() {
		return (
				<div>
				{this.props.rulesObj ? (Object.keys(this.props.rulesObj).map((rule, ind) => {
					return <DisplayRule rules={rule} key={ind}/>;
				})) : ''}
				</div>
			);
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
export default connect(mapStateToProps, mapDispatchToProps)(RuleBox);
