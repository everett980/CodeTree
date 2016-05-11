const ADD_RULE = 'addRule';
const DELETE_RULE = 'deleteRule';

export default function reducer(state = {}, action = {}) {
	switch(action.type) {
		case ADD_RULE:
			console.log('adding rule: ', action.rule);
			state[action.rule.split('-')[0]] = action.rule.split('-')[1];
			return state;
		case DELETE_RULE:
			console.log('deleting rule: ', action.rule);
			state.delete(action.rule.split('-')[0]);
			return state;
		default:
			return state;
	}
}

export function addRule(rule) {
	return {
		type: ADD_RULE,
		rule: rule
	}
}
export function deleteRule(rule) {
	return {
		type: DELETE_RULE,
		rule: rule
	}
}
